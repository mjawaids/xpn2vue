<template>
  <div id="app">

  <md-layout md-gutter class="main">
  <md-layout md-gutter class="t2_container1">
    <md-layout md-align="center">
     <h2>Bank-Problem</h2>
    </md-layout>

    <md-layout md-align="center">
     <h2>-V01-</h2>
    </md-layout>

    <md-layout md-align="center">
     <h2>Open Account Form Details</h2>
    </md-layout>

  </md-layout>


  <md-layout md-gutter class="t2_container2">
    <md-layout class="text1">

     <p>
     <md-button class="md-raised"><md-icon>add</md-icon></md-button>
     Precondition<br>
     <md-button class="md-raised"><md-icon>remove</md-icon></md-button>
     <u class="in_text1">Fields<br>
     SocialSecurityNumber
     <md-button class="md-raised btn"><md-icon>remove</md-icon></md-button><br>
     Name
     <md-button class="md-raised btn"><md-icon>remove</md-icon></md-button><br>
     Address
     <md-button class="md-raised btn"><md-icon>remove</md-icon></md-button><br>
     Zipcode
     <md-button class="md-raised btn"><md-icon>remove</md-icon></md-button><br>
     Place
     <md-button class="md-raised btn"><md-icon>remove</md-icon></md-button><br>
     New Field
     <md-button class="md-raised btn"><md-icon>remove</md-icon></md-button><br></u>
     <md-button class="md-raised"><md-icon>remove</md-icon></md-button>
     Postcondition<br>
     <u class="in_text1">New Rule
     <md-button class="md-raised btn"><md-icon>remove</md-icon></md-button><br></u>

     </p>
    </md-layout>

    <md-layout>

    </md-layout>
  </md-layout>

  </md-layout>


  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main {
width: 60%;
margin-left: 20%;
}

.btn1_t2 {
color: grey;
}

.t2_container1 {
position: relative;
width: 100%;
border: 2px solid grey;
border-radius: 10px;
}

.text1 {
text-align: left;
padding-left: 5%;
}

.t2_container2 {
position: absolute;
width: 25%;
border: 2px solid grey;
border-radius: 10px;
margin-top: 4%;
}

.md-button {
  padding: 0 0px 0 0px;
  min-width: 2px;
  width: 30px;
}

.btn {
margin-left: 100%;
}

</style>
