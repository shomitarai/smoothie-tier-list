<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title" />
      </div>

      <div v-for="(ing, index) in ingredients" :key="`ing-${index}`" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div v-for="(tag, index) in tags" :key="`tag-${index}`" class="field">
        <label for="tag">Tag:</label>
        <input type="text" name="tag" v-model="tags[index]" />
        <i class="material-icons delete" @click="deleteTag(tag)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" />
      </div>

      <div class="field">
        <label for="add-tag">Add a tag:</label>
        <input type="text" name="add-tag" @keydown.tab.prevent="addTag" v-model="another_tag" />
      </div>

      <div class="field center-align" v-if="toggleProgress">
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink" :class="{'disabled': toggleProgress}">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>


<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import slugify from 'slugify'
export default {
  name: 'AddSmoothie',
  data() {
    return {
      title: null,
      another: null,
      another_tag: null,
      ingredients: [],
      tags: [],
      feedback: null,
      slug: null,
      toggleProgress: false,
      user: null,
      user_id: null
    }
  },
  methods: {
    AddSmoothie() {
      if (this.title) {
        this.toggleProgress = true
        this.feedback = null
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('Smoothies')
          .add({
            title: this.title,
            ingredients: this.ingredients,
            tags: this.tags,
            likes: 0,
            slug: this.slug,
            uid: this.user.uid,
            user_id: this.user_id
          })
          .then(() => {
            this.$router.push({ name: 'Index' })
            this.toggleProgress = false
          })
          .catch(() => {
            this.toggleProgress = false
          })
      } else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    addTag() {
      if (this.another_tag) {
        this.tags.push(this.another_tag)
        this.another_tag = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add a tag'
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient !== ing
      })
    },
    deleteTag(tag) {
      this.tags = this.tags.filter(cur_tag => {
        return cur_tag != tag
      })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
        db.collection('users').where("uid", "==", user.uid).get().then(snapshot => {
          snapshot.forEach(doc => {
            this.user_id = doc.data().user_id
          })
        })
      } else {
        this.user = null
      }
    })
  }
}
</script>


<style>
.add-smoothie {
  margin: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
