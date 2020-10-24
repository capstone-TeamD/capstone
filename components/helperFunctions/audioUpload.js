export const audioUpload = async (uri) => {
  return new Promise(async (res, rej) => {
    const response = await fetch(uri)
    const file = await response.blob();
    const path = `audio/${Date.now()}.mp3`
    let upload = firebase.storage().ref(path).put(file)
    upload.on(
      'state_changed',
        (snapshot) => {
          console.log('Audio is uploading...');
        },
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        })
  })
}