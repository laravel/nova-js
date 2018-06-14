export default function(originalPromise, delay = 1000) {
  return Promise.all([
    originalPromise,
    new Promise(resolve => {
      setTimeout(() => resolve(), delay)
    }),
  ]).then(result => result[0])
}

// Usage
// minimum(axios.get('/'))
//     .then(response => console.log('done'))
//     .catch(error => console.log(error))
