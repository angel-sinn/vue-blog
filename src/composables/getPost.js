import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getPost = (id) => {
  const post = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      // get single doc from posts collection
      let res = await projectFirestore.collection('posts').doc(id).get()
      // console.log(res.data());

      if (!res.exists) {
        throw Error('That post does not exist')
      }

      post.value = { ...res.data(), id: res.id }
      console.log(post.value);
    }
    catch (err) {
      error.value = err.message
      console.log(error.value);
    }
  }

  return { post, error, load }
}

export default getPost;