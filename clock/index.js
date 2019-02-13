let vm = new Vue({
    el: '#app',
    data: {
        degree: {
            hour,
            minute,
            second
        }
    },
    mounted() {
        let vm = this;
        setInterval(function () {
            vm.clock()
        }, 1000);
    },
    methods: {
        clock() {
            let d = new Date()
            let hour = d.getHours()
            let min = d.getMinutes()
            let sec = d.getSeconds()

            this.degree.second = sec * 360 / 60 + 180
            this.degree.minute = min * 360 / 60 + (6 * sec / 60)
            this.degree.hour = hour * 360 / 12 + (30 * min / 60) - 90
        }
    }
})