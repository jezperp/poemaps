<template>
    <header>
        <img    src="@/assets/logo.png"
                class="img-fluid img-xl"
                alt="poemaps"
                width="338"
                height="80" />
    </header>
    <RouterView />
    <footer>
        <div class="container px-5">
            <div class="row">
                <div class="col col-12 col-lg">
                    <p class="small m-0">This website is not affiliated with or endorsed by Grinding Gear Games in any way.</p>
                </div>
                <div class="col col-12 col-lg-auto text-lg-end pt-2 pt-lg-0">
                    <p class="small m-0">&copy; poemaps</p>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup lang="ts">
    import { RouterView } from 'vue-router'
</script>
