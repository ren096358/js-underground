let vm = new Vue({
	el: '#app',
	data: {
		textNumber: '',
		result: 0,
		process: [],
		counting: false
	},
	computed: {
		formatTextNumber() {
			return this.textNumber.toLocaleString('en')
		},
		textNumberToNumber() {
			return Number(this.textNumber)
		},
		processToString() {
			let str = ''
			this.process.forEach(function (obj, index) {
				if (obj.mathSymbol !== null) {
					str += (obj.mathSymbol + ' ')
				}
				if (obj.number !== null) {
					str += (obj.number + ' ')
				}
			})
			return str
		},
		formatResult() {
			return this.result.toLocaleString('en')
		}
	},
	methods: {
		concatNumber(event) {
			let text = event.target.textContent
			temp = this.textNumber + text
			if (!isNaN(temp)) {
				this.textNumber += text
				this.counting = false
			}
		},
		addToProcess(mathSymbol) {
			//直接輸入符號，未帶入數字
			if (this.textNumber === '') {
				if (this.process.length === 0) {
					return
				} else {
					let obj = this.process.pop()
					obj.mathSymbol = mathSymbol
					this.process.push(obj)
				}
			} else {
				let obj = this.process.pop()
				//第一次輸入
				if (obj === undefined) {
					obj = {
						mathSymbol: null
					}
				}
				obj.number = this.textNumberToNumber
				this.process.push(obj)

				obj = {
					number: null,
					mathSymbol: mathSymbol
				}
				this.process.push(obj)

			}
			this.textNumber = ''
			this.caculate()
		},
		deleteLastNumber() {
			this.textNumber = this.textNumber.substring(
				0,
				this.textNumber.length - 1
			);
		},
		resetData() {
			this.textNumber = ''
			this.result = 0
			this.process = []
			this.counting = false
		},
		caculate() {
			if (this.process.length === 0) {
				return
			}
			this.result = this.process[0].number
			let self = this
			this.counting = true
			this.process.some(function (obj, index) {
				if (index === 0) {
					return false
				}
				if (obj.number !== null) {
					switch (obj.mathSymbol) {
						case '+':
							self.result += obj.number
							break
						case '-':
							self.result -= obj.number
							break
						case '×':
							self.result *= obj.number
							break
						case '÷':
							if (obj.number === 0) {
								self.result = '無法除以零'
								self.process = []
								return true
							}
							self.result /= obj.number
							break
						default:
							console.loge('無效的運算符號')
							break
					}
				}
			})
		},
		finalResult() {
			if (this.textNumber !== '') {
				let obj = this.process.pop()
				obj.number = this.textNumberToNumber
				this.process.push(obj)
			}
			this.caculate()
			this.textNumber = ''
			this.process = []
		}
	}
});