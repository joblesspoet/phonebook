<template>
  <div>
    
    <nav class="panel column is-offset-2 is-8">
      <p class="panel-heading">
        Phonebook 
        <button class="button is-link is-outlined" @click="openAdd">
          Add New
        </button>
        <span class="is-pulled-right" v-if="loading">
          <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>
        </span>
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="search" v-model="searchQuery">
          <span class="icon is-small is-left">
            <i class="fa fa-search"></i>
          </span>
        </p>
      </div>
      
      
      <a class="panel-block" v-for="item,key in temp_list">
        <span class="column is-9">
            {{item.name}}
        </span>

        <span class="panel-icon column is-1">
          <i class="has-text-danger fa fa-trash" aria-hidden="true" @click="delItem(key,item.id)"></i>
        </span>
        <span class="panel-icon column is-1">
          <i class="has-text-info fa fa-edit" aria-hidden="true" @click="openUpdate(key)"></i>
        </span>
        <span class="panel-icon column is-1">
          <i class="has-text-primary fa fa-eye" aria-hidden="true" @click="showOpen(key)"></i>
        </span>
      </a>
    </nav>
    <Add :openmodal='addActive' @closeRequest='closeModal'></Add>
    <Show :openmodal='showActive' @closeRequest='closeModal'></Show>
     <Update :openmodal='updateActive' @closeRequest='closeModal'></Update>
  </div>
</template>
<script>
let Add      = require('./Add.vue');
let Show      = require('./Show.vue');
let Update      = require('./Update.vue');
export default{
  components:{Add,Show,Update},
  data(){
    return {
      addActive: '',
      showActive:'',
      updateActive:'',
      loading:false,
      lists:{},
      errors:{},
      searchQuery:"",
      temp_list:''
    }
  },
  watch:{
    searchQuery(){
     
      if(this.searchQuery.length > 0){
         
        this.temp_list = this.lists.filter((item)=>{
        return  Object.keys(item).some((key)=>{
            let string = String(item[key]);
            return string.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
          })
          
        }) 
        
      }else{
        this.temp_list = this.lists;
      }
    }
  },
  methods:{
    openAdd(){
      this.addActive = 'is-active'
    },
    showOpen(key){
      this.$children[1].list = this.temp_list[key]
      this.showActive = 'is-active'
    },
    openUpdate(key){
      this.$children[2].list = this.temp_list[key]
      this.updateActive = 'is-active'
    },
    closeModal(){
      this.addActive = '';
      this.showActive = '';
      this.updateActive = '';
    },
    delItem(key,id){
      console.log(`${key} ${id}`)
     
      if(confirm("Are you sure ?")){
         this.loading = !this.loading;
        axios.delete(`/phonebook/${id}`)
            .then((response) => {this.lists.splice(key,1); this.loading = !this.loading;
              this.temp_list = this.lists;
            })
            .catch((error) =>  this.errors = error.response.data);
      }
    }
  },
  mounted(){
    axios.post('/getData')
            .then((response) => this.lists = this.temp_list = response.data)
            .catch((error) =>  this.errors = error.response.data);

  }
}  
</script>