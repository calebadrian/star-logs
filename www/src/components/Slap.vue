<template>
  <div class="hello">
    <div v-for="target in targets">
      <img :src="target.imgUrl" height="150">
      <h1 :class="{
        healthy: target.health >= 90,
        warning: target.health < 90 && target.health >= 50,
        'near-death': target.health < 50 && target.health > 0,
        dead: target.health <= 0
      }">{{ target.health ? target.health : target.name + ' is in recovery now' }}</h1>
      <h3>Current Modifier: {{target.currentMod.toFixed(2)}}</h3>
      <div>
        <button v-for="(damage, attackType) in target.attackTypes" @click="attack(attackType, target)" :disabled="target.health < damage">
          {{attackType}}
        </button>
        <button v-for="(damage, item) in target.items" @click="addMod(item, target)" :disabled="target.activeItems.includes(target.items[item])">{{item}}</button>
        <button @click="reset(target)">reset</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        targets: [{
          name: 'Po',
          health: 100,
          maxHealth: 100,
          imgs: {
            start: 'http://placehold.it/200x200',
            hurt: 'http://placehold.it/500x500'
          },
          imgUrl: 'http://placehold.it/200x200',
          attackTypes: {
            slap: 1,
            punch: 5,
            kick: 10
          },
          items: {
            little: .1,
            medium: .2,
            big: .4
          },
          activeItems: [],
          currentMod: 0
        },
        {
          name: 'Shifu',
          health: 150,
          maxHealth: 150,
          imgs: {
            start: 'http://placehold.it/200x200',
            hurt: 'http://placehold.it/500x500'
          },
          imgUrl: 'http://placehold.it/200x200',
          attackTypes: {
            slap: 5,
            punch: 0,
            kick: 8
          },
          items: {
            little: .1,
            medium: .2,
            big: .4
          },
          activeItems: [],
          currentMod: 0
        }]
      }
    },
    methods: {
      addMod(item, target){
        target.activeItems.push(target.items[item])
        target.currentMod += target.items[item]
      },
      attack(attackType, target){
        var mod = 1
        var damage = target.attackTypes[attackType]
        if (damage){
          for (var i = 0; i < target.activeItems.length; i++){
            mod -= target.activeItems[i]
          }
          target.health -= damage * mod
          target.health = target.health < 0 ? 0 : target.health
          if (target.health <= 50){
            target.imgUrl = target.imgs.hurt
          }
        }
      },
      reset(target){
        target.health = target.maxHealth
        target.imgUrl = target.imgs.start
        target.activeItems = []
        target.currentMod = 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .healthy{
    color: green;
  }
  .warning{
    color: orange;
  }
  .near-death{
    color: orangered;
  }
  .dead{
    color: grey;
  }
</style>