<template>
    <div>
       <div class="brand">
            <img class="brand-image" src="@/assets/images/logo.png" alt="" srcset="">
       </div>
       <div class="brand_items">
            <div class="brand_item">
                    <div class="brand_item-icon">
                    <b-icon
                        pack="fas"
                        icon="home"
                        size="is-large"
                    >
            </b-icon>
                    </div>
                    <div class="brand_item-text">
                            Home
                    </div>
            </div>
            <div class="brand_item">
                <div class="brand_item-icon">
                    <b-icon
                        pack="fas"
                        icon="history"
                        size="is-large"
                    >
            </b-icon>
                    </div>
                    <div class="brand_item-text">
                            Recent
                    </div>
            </div>
            <div class="brand_item">
                    <div class="brand_item-icon">
                    <b-icon
                        pack="fas"
                        icon="bell"
                        size="is-large"
                    >
            </b-icon>
                    </div>
                    <div class="brand_item-text">
                            Notifications
                    </div>
            </div>
            <div class="brand-item" >
                 <b-button class="new-tweet" type="is-primary shadow-sm" rounded>Tweet</b-button>
            </div>
       </div>
    </div>
</template>