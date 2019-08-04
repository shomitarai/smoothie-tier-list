<template>
  <div class="edit-smoothie container">
    <h2 v-if="smoothie">
      Edit a smoothie
      <span class="smoothie-title">{{ this.smoothie.title }}</span>
    </h2>
    <form @submit.prevent="EditSmoothie" v-if="smoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>

      <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div v-for="(tag, index) in smoothie.tags" :key="index" class="field">
        <label for="tag">Tag:</label>
        <input type="text" name="tag" v-model="smoothie.tags[index]" />
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
        <button class="btn pink" :class="{'disabled': toggleProgress}">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>


<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'EditSmoothie',
  data() {
    return {
      smoothie: null,
      another: null,
      another_tag: null,
      feedback: null,
      toggleProgress: false
    }
  },
  methods: {
    EditSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null
        this.toggleProgress = true
        // create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('Smoothies')
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            this.toggleProgress = false
            this.$router.push({ name: 'Index' })
          })
          .catch(err => {
            this.toggleProgress = false
            console.log(err)
          })
      } else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another)
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
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient !== ing
        }
      )
    },
    deleteTag(tag) {
      this.tags = this.tags.filter(cur_tag => {
        return cur_tag != tag
      })
    }
  },
  created() {
    let ref = db
      .collection('Smoothies')
      .where('slug', '==', this.$route.params.smoothie_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data()
        this.smoothie.id = doc.id
      })
    })
  }
}
</script>

<style>
.edit-smoothie {
  margin: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie h2 .smoothie-title {
  color: #ce4177;
}

.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
