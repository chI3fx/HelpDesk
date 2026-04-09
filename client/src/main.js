import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './services/api';

// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createApp(App).use(router).mount('#app');
