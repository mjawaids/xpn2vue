Vue.component('task', {

template: '<h3><slot></slot></h3>'

});

new Vue({

el: '#app',
data: {

	//titles: ['Bank-Problem', '-V01-','Monthly Cost Action Details'],
	main: 'main',
	class1: 'myclass1',
	content1: 'content1',
	class2: 'myclass2',
	d1: "d1",
	d2: "d2",
	d3: "d3",
	p1: "p1",
	p2: "p2",
	p3: "p3",
	inclass2: "inclass2",
	btn1: "btn1",
	btn2: "btn2",
	btn3: "btn3"
	
}
	

});