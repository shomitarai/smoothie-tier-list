<template>
  <div class="top">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="valign-wrapper">
            <h1 class="title">Smoothie Magic</h1>
          </div>
          <div class="valign-wrapper">
            <h2 class="subtitle">Share and find nice smoothie</h2>
          </div>
        </div>
      </div>
    </section>
    <div class="sample-smoothie">
      <div class="container">
        <h1 class="center">Smoothie List</h1>
        <div class="row">
          <div class="card col s12 m6 l4" v-for="smoothie in slicedSmoothies" :key="smoothie.id">
            <div class="card-content">
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
                <i class="material-icons like">favorite</i>
                <span class="indigo-text text-darken-2 like_count">: {{ smoothie.likes }}</span>
              </div>
              <h3 class="indigo-text">by {{ smoothie.user_id }}</h3>
            </div>
          </div>
        </div>
        <div class="center">
          <router-link :to="{name: 'Index'}">
            <button class="btn indigo darken-2">Show more...</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <h1 class="center">Features</h1>
      <div class="row">
        <div class="col s6 m6 l6">
          <div class="card feature small">
            <div class="card-content">
              <span class="card-title center">Share</span>
              <p>Share your nice smoothie recipe.</p>
            </div>
          </div>
        </div>
        <div class="col s6 m6 l6">
          <div class="card feature small">
            <div class="card-content">
              <span class="card-title center">Like</span>
              <p>Like your favorite smoothie and make your original smoothie recipe book.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: 'Top',
    data() {
      return {
        smoothies: []
      }
    },
    computed: {
      slicedSmoothies(){
        return this.smoothies.slice(0, 3)
      }
    },
    created(){
      db.collection('Smoothies').get().then(snapshot => {
        snapshot.forEach(doc => {
          let smoothie = doc.data()
          smoothie.id = doc.id
          this.smoothies.push(smoothie)
        })
      })
    }
}
</script>

<style>
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.35), rgba(240, 187, 72, 0.35)),
    url('../assets/background.jpg') center;
  font-family: 'Amatic SC', cursive;

  height: 500px;
}
.hero .title {
  font-size: 7rem;
  font-weight: normal;
}

.top .like {
  color: #f1297c;
  cursor: pointer;
  font-size: 1.4em;
}

.top .like_count {
  color: #aaa;
  position: relative;
  bottom: 6px;
  padding: 5px;
}

.top h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}

.top h3 {
  font-size: 0.8em;
  margin-top: 10px;
}

.top .ingredients {
  margin: 30px auto;
}

.top .ingredients li {
  display: inline-block;
}

.top .tags li {
  display: inline-block;
}

.top .tags .chip {
  background-color: #ffd16f;
}

.feature .card-content .card-title {
  font-size: 2em;
}

.feature .card-content p {
  /* font-family: Arial, Helvetica, sans-serif; */
  font-size: 1.2em;
  font-weight: lighter;
}
</style>