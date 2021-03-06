import Task from 'data.task'
import {memoize, compose, curry, curryN, chain} from 'ramda'
import Maybe from 'data.maybe'

// debug :: String -> a -> a
/*
const debug = curry((tag, toInspect) => {
    console.log(`${tag}: `, toInspect)
    return toInspect
})
*/

// promiseToTask :: Promise -> Task
const promiseToTask = p => new Task((rej, res) => p.then(res).catch(rej))

// checkStatus :: Task a Response -> Task a|Error Response
const checkStatus = t => t
    .chain(response => response.status >= 200 && response.status < 300
        ? Task.of(response)
        // Google will return some nice info on an error, so we'll try to get that for our error message.  Otherwise, just provide a generic message
        : responseToObject(response)
            // this would be the error from getting the response object
            .orElse(() => Error(`${response.status}: ${response.statusText}`))
            // we got the response object, now provide a nice error message
            .chain(x => x.error && x.error.message
                ? Task.rejected(Error(x.error.message))
                : Task.rejected(Error(`${response.status}: ${response.statusText}`))
            )
    )

// pFetch :: Object -> String -> Promise
const pFetch = curry((params, url) => fetch(url, params))

// tFetch :: Object -> String -> Task
const tFetch = curryN(2, compose(checkStatus, promiseToTask, pFetch))

// responseToObject :: Response -> Task Error Object
const responseToObject = x => promiseToTask(x.json())

// getLists :: String -> Task Error Object
const getLists = compose(chain(responseToObject), tFetch({method: 'get'}))

// listsUrl :: String -> String
const listsUrl = (apiKey) => `https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&key=${apiKey}`

// urlParams :: URLSearchParams
const urlParams = memoize(() => new URLSearchParams(window.location.search))

// hasParam :: String -> Boolean
const hasParam = name => compose(x => x.has(name), urlParams)()

// getParam :: String -> Maybe String
const getParam = name => {
    const get = compose(x => x.get(name), urlParams)

    return hasParam(name)
        ? Maybe.Just(get())
        : Maybe.Nothing()
}

// fork :: f -> g -> Task -> <Side Effects>
const fork = curry((rej, succ, x) => x.fork(rej, succ))

// app :: String -> <Side Effects>
const app = compose(fork(err => console.log('error: ', err), data => console.log('data: ', data)), getLists, listsUrl)

getParam('key')
    .map(app)
    .orElse(() => alert("You must provide a 'key' in the URL."))
