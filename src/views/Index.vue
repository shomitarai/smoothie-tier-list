<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
        <ul class="tags">
          <li v-for="(tag, index) in smoothie.tags" :key="index">
            <span class="chip">#{{ tag }}</span>
          </li>
        </ul>
        <div>
          <i class="material-icons like" @click="addLike(smoothie)">favorite</i>
          <span class="indigo-text text-darken-2 like_count">: {{ smoothie.likes }}</span>
        </div>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug } }">
          <i class="material-icons">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data() {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie(id) {
      // delete doc from firestore
      db.collection('Smoothies')
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id !== id
          })
        })
    },
    addLike(smoothie) {
      if (smoothie.likes) {
        smoothie.likes += 1
      } else {
        smoothie.likes = 1
      }
      db.collection('Smoothies')
        .doc(smoothie.id)
        .update({
          likes: smoothie.likes
        })
        .then(() => {
          this.smoothies
        })
    }
  },
  created() {
    // fetch data from the firebase
    db.collection('Smoothies')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let smoothie = doc.data()
          smoothie.id = doc.id
          this.smoothies.push(smoothie)
        })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}

.index ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .tags li {
  display: inline-block;
}

.index .tags .chip {
  background-color: #ffd16f;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

.index .like {
  color: #f1297c;
  cursor: pointer;
  font-size: 1.4em;
}

.index .like_count {
  color: #aaa;
  position: relative;
  bottom: 6px;
  padding: 5px;
}
</style>
