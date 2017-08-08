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
	first: "first",
	box1: "box1",
	mybtn: "mybtn",
    class3: "myclass3",
    second: "second",
    left: "left",
    right: "right",
    box2: "box2"
}
	

});