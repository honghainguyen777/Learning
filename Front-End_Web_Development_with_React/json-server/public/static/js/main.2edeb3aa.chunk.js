(this.webpackJsonppizza4all=this.webpackJsonppizza4all||[]).push([[0],{155:function(e,t,a){},156:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(13),s=a.n(l),c=(a(96),a(97),a(98),a(15)),o=a(16),m=a(18),i=a(17),u=a(2),d=function(){return r.a.createElement("div",{className:"col-12"},r.a.createElement("span",{className:"fa fa-spinner fa-pulse fa-3x fa-fw text-primary"}),r.a.createElement("p",null,"Loading . . ."))},E="http://localhost:3001/",h=a(22);function f(e){var t=e.item,a=e.isLoading,n=e.errMess;return a?r.a.createElement(d,null):n?r.a.createElement("h4",null,n):r.a.createElement(h.FadeTransform,{in:!0,transformProps:{exitTransform:"scale(0.5) translateY(-50%)"}},r.a.createElement(u.d,null,r.a.createElement(u.g,{src:E+t.image,alt:t.name}),r.a.createElement(u.e,null,r.a.createElement(u.k,null,t.name),t.designation?r.a.createElement(u.i,null,t.designation):null,r.a.createElement(u.j,null,t.description))))}var p=function(e){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row align-items-start"},r.a.createElement("div",{className:"col-12 col-md m-1"},r.a.createElement(f,{item:e.dish,isLoading:e.dishesLoading,errMess:e.dishesErrMess})),r.a.createElement("div",{className:"col-12 col-md m-1"},r.a.createElement(f,{item:e.promotion,isLoading:e.promosLoading,errMess:e.promosErrMess})),r.a.createElement("div",{className:"col-12 col-md m-1"},r.a.createElement(f,{item:e.leader,isLoading:e.leadersLoading,errMess:e.leadersErrMess}))))},g=a(6);function b(e){var t=e.dish;return r.a.createElement(u.d,{key:t.id},r.a.createElement(g.b,{to:"/menu/".concat(t.id)},r.a.createElement(u.g,{width:"100%",src:E+t.image,alt:t.name}),r.a.createElement(u.h,null,r.a.createElement(u.k,null,t.name))))}var N=function(e){var t=e.dishes.dishes.map((function(e){return r.a.createElement("div",{key:e.id,className:"col-12 col-md-5 m-1"},r.a.createElement(b,{dish:e}))}));return e.dishes.isLoading?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement(d,null))):e.dishes.errMess?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("h4",null,e.dishes.errMess))):r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement(u.a,null,r.a.createElement(u.b,null,r.a.createElement(g.b,{to:"/home"},"Home")),r.a.createElement(u.b,{active:!0},"Menu")),r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,"Menu"),r.a.createElement("hr",null))),r.a.createElement("div",{className:"row"},t))},v=a(14),y=a(8),O=function(e){return e&&e.length},w=function(e){return function(t){return!t||t.length<=e}},M=function(e){return function(t){return t&&t.length>=e}},L=function(e){return!isNaN(Number(e))},k=function(e){return/^[A-Z0-9._%+-]+@[A-Z9-9.-]+\.[A-Z]{2,4}$/i.test(e)},j=function(e){Object(m.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleSubmit=n.handleSubmit.bind(Object(v.a)(n)),n}return Object(o.a)(a,[{key:"handleSubmit",value:function(e){this.props.postFeedback(e),this.props.resetFeedbackForm()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement(u.a,null,r.a.createElement(u.b,null,r.a.createElement(g.b,{to:"/home"},"Home")),r.a.createElement(u.b,{active:!0},"Contact Us")),r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,"Contact Us"),r.a.createElement("hr",null))),r.a.createElement("div",{className:"row row-content"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,"Location Information")),r.a.createElement("div",{className:"col-12 col-sm-4 offset-sm-1"},r.a.createElement("h5",null,"Our Address"),r.a.createElement("address",null,"777, Earth",r.a.createElement("br",null),"Solar System",r.a.createElement("br",null),"Miky Way Galaxy",r.a.createElement("br",null),r.a.createElement("i",{className:"fa fa-phone"}),": +123 456 789",r.a.createElement("br",null),r.a.createElement("i",{className:"fa fa-fax"}),": +123 456 789",r.a.createElement("br",null),r.a.createElement("i",{className:"fa fa-envelope"}),": ",r.a.createElement("a",{href:"mailto:contact@pizza4all.net"},"contact@pizza4all.net"))),r.a.createElement("div",{className:"col-12 col-sm-6 offset-sm-1"},r.a.createElement("h5",null,"Map of our Location")),r.a.createElement("div",{className:"col-12 col-sm-11 offset-sm-1"},r.a.createElement("div",{className:"btn-group",role:"group"},r.a.createElement("a",{role:"button",className:"btn btn-primary",href:"tel:+85212345678"},r.a.createElement("i",{className:"fa fa-phone"})," Call"),r.a.createElement("a",{role:"button",className:"btn btn-info",href:"skype:xxxx?add"},r.a.createElement("i",{className:"fa fa-skype"})," Skype"),r.a.createElement("a",{role:"button",className:"btn btn-success",href:"mailto:confusion@food.net"},r.a.createElement("i",{className:"fa fa-envelope-o"})," Email")))),r.a.createElement("div",{className:"row row-content"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,"Send us Your Feedback")),r.a.createElement("div",{className:"col-12 col-md-9"},r.a.createElement(y.Form,{model:"feedback",onSubmit:function(t){return e.handleSubmit(t)}},r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.r,{htmlFor:"firstname",md:2},"First Name"),r.a.createElement(u.l,{md:10},r.a.createElement(y.Control.text,{model:".firstname",id:"firstname",name:"firstname",placeholder:"First Name",className:"form-control",validators:{required:O,minLength:M(2),maxLength:w(15)}}),r.a.createElement(y.Errors,{className:"text-danger",model:".firstname",show:"touched",messages:{required:"Required",minLength:"Must be greater than 2 characters",maxLength:"Must be 15 characters or less"}}))),r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.r,{htmlFor:"lastname",md:2},"Last Name"),r.a.createElement(u.l,{md:10},r.a.createElement(y.Control.text,{model:".lastname",id:"lastname",name:"lastname",placeholder:"Last Name",className:"form-control",validators:{required:O,minLength:M(2),maxLength:w(15)}}),r.a.createElement(y.Errors,{className:"text-danger",model:".lastname",show:"touched",messages:{required:"Required",minLength:"Must be greater than 2 characters",maxLength:"Must be 15 characters or less"}}))),r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.r,{htmlFor:"telnum",md:2},"Contact Tel."),r.a.createElement(u.l,{md:10},r.a.createElement(y.Control.text,{model:".telnum",id:"telnum",name:"telnum",placeholder:"Tel. Number",className:"form-control",validators:{required:O,minLength:M(5),maxLength:w(15),isNumber:L}}),r.a.createElement(y.Errors,{className:"text-danger",model:".telnum",show:"touched",messages:{required:"Required",minLength:"Must be greater than 5 numbers",maxLength:"Must be 15 numbers or less",isNumber:"Must be a number"}}))),r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.r,{htmlFor:"email",md:2},"Email"),r.a.createElement(u.l,{md:10},r.a.createElement(y.Control.text,{model:".email",id:"email",name:"email",placeholder:"Email",className:"form-control",validators:{required:O,validEmail:k}}),r.a.createElement(y.Errors,{className:"text-danger",model:".email",show:"touched",messages:{required:"Required",validEmail:"Invalid email address"}}))),r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.l,{md:{size:6,offset:2}},r.a.createElement("div",{className:"form-check"},r.a.createElement(u.r,{check:!0},r.a.createElement(y.Control.checkbox,{model:".agree",name:"agree",className:"form-check-input"})," "," "," ",r.a.createElement("strong",null,"May we contact you?")))),r.a.createElement(u.l,{md:{size:3,offset:1}},r.a.createElement(y.Control.select,{model:".contactType",name:"contactType",className:"form-control"},r.a.createElement("option",null,"Tel."),r.a.createElement("option",null,"Email")))),r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.r,{htmlFor:"message",md:2},"Your Feedback"),r.a.createElement(u.l,{md:10},r.a.createElement(y.Control.textarea,{model:".message",id:"message",name:"message",rows:"12",className:"form-control"}))),r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.l,{md:{size:10,offset:2}},r.a.createElement(u.c,{type:"submit",color:"primary"},"Send Feedback")))))))}}]),a}(n.Component);var S=function(e){function t(e){var t=e.leaders;return t.isLoading?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement(d,null))):t.errMess?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("h4",null,t.errMess))):r.a.createElement("div",{className:"col-12 mt-5"},r.a.createElement(u.s,{list:!0},r.a.createElement(h.Stagger,{in:!0},t.leaders.map((function(e){return r.a.createElement(h.Fade,{in:!0,key:e.id},r.a.createElement(u.s,{tag:"li"},r.a.createElement(u.s,{left:!0},r.a.createElement(u.s,{object:!0,src:E+e.image,alt:e.name})),r.a.createElement(u.s,{body:!0,className:"ml-5"},r.a.createElement(u.s,{heading:!0},e.name),r.a.createElement("p",null,e.designation),r.a.createElement("p",null,e.description))))})))))}return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement(u.a,null,r.a.createElement(u.b,null,r.a.createElement(g.b,{to:"/home"},"Home")),r.a.createElement(u.b,{active:!0},"About Us")),r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,"About Us"),r.a.createElement("hr",null))),r.a.createElement("div",{className:"row row-content"},r.a.createElement("div",{className:"col-12 col-md-6"},r.a.createElement("h2",null,"Our History"),r.a.createElement("p",null,"Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us."),r.a.createElement("p",null,"The restaurant traces its humble beginnings to ",r.a.createElement("em",null,"The Frying Pan"),", a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.")),r.a.createElement("div",{className:"col-12 col-md-5"},r.a.createElement(u.d,null,r.a.createElement(u.f,{className:"bg-primary text-white"},"Facts At a Glance"),r.a.createElement(u.e,null,r.a.createElement("dl",{className:"row p-1"},r.a.createElement("dt",{className:"col-6"},"Started"),r.a.createElement("dd",{className:"col-6"},"3 Feb. 2013"),r.a.createElement("dt",{className:"col-6"},"Major Stake Holder"),r.a.createElement("dd",{className:"col-6"},"HK Fine Foods Inc."),r.a.createElement("dt",{className:"col-6"},"Last Year's Turnover"),r.a.createElement("dd",{className:"col-6"},"$1,250,375"),r.a.createElement("dt",{className:"col-6"},"Employees"),r.a.createElement("dd",{className:"col-6"},"40"))))),r.a.createElement("div",{className:"col-12"},r.a.createElement(u.d,null,r.a.createElement(u.e,{className:"bg-faded"},r.a.createElement("blockquote",{className:"blockquote"},r.a.createElement("p",{className:"mb-0"},"You better cut the pizza in four pieces because I'm not hungry enough to eat six."),r.a.createElement("footer",{className:"blockquote-footer"},"Yogi Berra,",r.a.createElement("cite",{title:"Source Title"},"The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books, 2014"))))))),r.a.createElement("div",{className:"row row-content"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h2",null,"Corporate Leadership")),r.a.createElement(t,{leaders:e.leaders})))};function x(e){var t=e.dish;return r.a.createElement(u.d,null,r.a.createElement(u.g,{top:!0,src:E+t.image,alt:t.name}),r.a.createElement(u.e,null,r.a.createElement(u.k,null,t.name),r.a.createElement(u.j,null,t.description)))}function D(e){var t=e.comments,a=e.postComment,n=e.dishId;return null===t?r.a.createElement("div",null):r.a.createElement("div",{className:"col-12 col-md-5 m-1"},r.a.createElement("h4",null,"Comments Here"),r.a.createElement("ul",{className:"list-unstyled"},r.a.createElement(h.Stagger,{in:!0},t.map((function(e){return r.a.createElement(h.Fade,{in:!0},r.a.createElement("li",{key:e.id},r.a.createElement("p",null,e.comment),r.a.createElement("p",null,"-- ",e.author,", ",new Intl.DateTimeFormat("en-US",{year:"numeric",month:"short",day:"2-digit"}).format(new Date(Date.parse(e.date))))))})))),r.a.createElement(A,{dishId:n,postComment:a}))}var F=function(e){return e&&e.length},C=function(e){return function(t){return!t||t.length<=e}},A=function(e){Object(m.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={isModalOpen:!1},n.toggleModal=n.toggleModal.bind(Object(v.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(v.a)(n)),n}return Object(o.a)(a,[{key:"toggleModal",value:function(){this.setState({isModalOpen:!this.state.isModalOpen})}},{key:"handleSubmit",value:function(e){this.toggleModal(),this.props.postComment(this.props.dishId,e.rating,e.author,e.comment)}},{key:"render",value:function(){var e,t=this;return r.a.createElement("div",null,r.a.createElement(u.c,{outline:!0,onClick:this.toggleModal},r.a.createElement("span",{className:"fa fa-pencil fa-lg"})," Submit Comment"),r.a.createElement(u.t,{isOpen:this.state.isModalOpen,toggle:this.toggleModal},r.a.createElement(u.v,null,"Submit Comment"),r.a.createElement(u.u,null,r.a.createElement(y.LocalForm,{onSubmit:function(e){return t.handleSubmit(e)}},r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.r,{htmlFor:"rating",md:2},"Rating"),r.a.createElement(u.l,{md:10},r.a.createElement(y.Control.select,{model:".rating",name:"rating",className:"form-control"},r.a.createElement("option",null,"1"),r.a.createElement("option",null,"2"),r.a.createElement("option",null,"3"),r.a.createElement("option",null,"4"),r.a.createElement("option",null,"5")))),r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.r,{htmlFor:"author",md:2},"Your Name"),r.a.createElement(u.l,{md:10},r.a.createElement(y.Control.text,{model:".author",id:"author",className:"form-control",name:"author",placeholder:"Your name",validators:{required:F,minLength:(e=3,function(t){return t&&t.length>=e}),maxLength:C(15)}}),r.a.createElement(y.Errors,{className:"text-danger",model:".author",show:"touched",messages:{required:"Required. ",minLength:"Must be greater than 5 characters. ",maxLength:"Must be less than or equal to 15 characters."}}))),r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.r,{htmlFor:"comment",md:2},"Comment"),r.a.createElement(u.l,{md:10},r.a.createElement(y.Control.textarea,{model:".comment",id:"comment",name:"comment",rows:"6",className:"form-control"}))),r.a.createElement(u.B,{className:"form-group"},r.a.createElement(u.l,{md:{size:10,offset:2}},r.a.createElement(u.c,{type:"submit",color:"primary"},"Submit")))))))}}]),a}(n.Component),I=function(e){return e.isLoading?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement(d,null))):e.errMess?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("h4",null,e.errMess))):null!=e.dish?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement(u.a,null,r.a.createElement(u.b,null,r.a.createElement(g.b,{to:"/menu"},"Menu")),r.a.createElement(u.b,{active:!0},e.dish.name)),r.a.createElement("div",{className:"col-12"},r.a.createElement("h3",null,e.dish.name),r.a.createElement("hr",null))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 col-md-5 m-1"},r.a.createElement(h.FadeTransform,{in:!0,transformProps:{exitTransform:"scale(0.5) translateY(-50%)"}},r.a.createElement(x,{dish:e.dish}))),r.a.createElement(D,{comments:e.comments,postComment:e.postComment,dishId:e.dish.id}))):r.a.createElement("div",null)},T=function(e){Object(m.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={isNavOpen:!1,isModalOpen:!1},n.toggleNav=n.toggleNav.bind(Object(v.a)(n)),n.toggleModal=n.toggleModal.bind(Object(v.a)(n)),n.handleLogin=n.handleLogin.bind(Object(v.a)(n)),n}return Object(o.a)(a,[{key:"toggleNav",value:function(){this.setState({isNavOpen:!this.state.isNavOpen})}},{key:"toggleModal",value:function(){this.setState({isModalOpen:!this.state.isModalOpen})}},{key:"handleLogin",value:function(e){this.toggleModal(),alert("Username: "+this.username.value+" Password: "+this.password.value+" Remember: "+this.remember.checked),e.preventDefault()}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.y,{dark:!0,expand:"md"},r.a.createElement("div",{className:"container"},r.a.createElement(u.A,{onClick:this.toggleNav}),r.a.createElement(u.z,{className:"mr-auto",href:"/"},r.a.createElement("img",{src:"assets/images/logo.png",height:"30",width:"41",alt:"Pizza4All"})),r.a.createElement(u.m,{isOpen:this.state.isNavOpen,navbar:!0},r.a.createElement(u.w,{navbar:!0},r.a.createElement(u.x,null,r.a.createElement(g.c,{className:"nav-link",to:"/home"},r.a.createElement("span",{className:"fa fa-home fa-lg"})," Home")),r.a.createElement(u.x,null,r.a.createElement(g.c,{className:"nav-link",to:"/aboutus"},r.a.createElement("span",{className:"fa fa-info fa-lg"})," About Us")),r.a.createElement(u.x,null,r.a.createElement(g.c,{className:"nav-link",to:"/menu"},r.a.createElement("span",{className:"fa fa-list fa-lg"})," Menu")),r.a.createElement(u.x,null,r.a.createElement(g.c,{className:"nav-link",to:"/contactus"},r.a.createElement("span",{className:"fa fa-address-card fa-lg"})," Contact Us"))),r.a.createElement(u.w,{className:"ml-auto",navbar:!0},r.a.createElement(u.x,null,r.a.createElement(u.c,{outline:!0,onClick:this.toggleModal},r.a.createElement("span",{className:"fa fa-sign-in fa-lg"}),"Login")))))),r.a.createElement(u.q,null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row row-header"},r.a.createElement("div",{className:"col-12 col-sm-6"},r.a.createElement("h1",null,"Pizza4All"),r.a.createElement("p",null,"Eat Pizzas, Love Pizzas. Pizzas bring people together, create happy emotion. Look at people on the street who are holding this Pizza4All! They are laughing. It is why Pizza4All is a good taste of peope's lives"))))),r.a.createElement(u.t,{isOpen:this.state.isModalOpen,toggle:this.toggleModal},r.a.createElement(u.v,null,"Login"),r.a.createElement(u.u,null,r.a.createElement(u.n,{onSubmit:this.handleLogin},r.a.createElement(u.o,null,r.a.createElement(u.r,{htmlFor:"username"},"Username"),r.a.createElement(u.p,{type:"text",id:"username",name:"username",innerRef:function(t){return e.username=t}})),r.a.createElement(u.o,null,r.a.createElement(u.r,{htmlFor:"password"},"Password"),r.a.createElement(u.p,{type:"password",id:"password",name:"password",innerRef:function(t){return e.password=t}})),r.a.createElement(u.o,{check:!0},r.a.createElement(u.r,{check:!0},r.a.createElement(u.p,{type:"checkbox",name:"remember",innerRef:function(t){return e.remember=t}})," Remember me")),r.a.createElement(u.c,{type:"submit",value:"submit",color:"primary"},"Login")))))}}]),a}(n.Component);var z=function(e){return r.a.createElement("div",{className:"footer"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-4 offset-1 col-sm-2"},r.a.createElement("h5",null,"Links"),r.a.createElement("ul",{className:"list-unstyled"},r.a.createElement("li",null,r.a.createElement(g.b,{to:"/home"},"Home")),r.a.createElement("li",null,r.a.createElement(g.b,{to:"/aboutus"},"About Us")),r.a.createElement("li",null,r.a.createElement(g.b,{to:"/menu"},"Menu")),r.a.createElement("li",null,r.a.createElement(g.b,{to:"/contactus"},"Contact Us")))),r.a.createElement("div",{className:"col-7 col-sm-5"},r.a.createElement("h5",null,"Our Address"),r.a.createElement("address",null,"777, Earth",r.a.createElement("br",null),"Solar System",r.a.createElement("br",null),"Miky Way Galaxy",r.a.createElement("br",null),r.a.createElement("i",{className:"fa fa-phone fa-lg"}),": +123 456 789",r.a.createElement("br",null),r.a.createElement("i",{className:"fa fa-fax fa-lg"}),": +123 456 789",r.a.createElement("br",null),r.a.createElement("i",{className:"fa fa-envelope fa-lg"}),": ",r.a.createElement("a",{href:"mailto:contact@pizza4all.net"},"contact@pizza4all.net"))),r.a.createElement("div",{className:"col-12 col-sm-4 align-self-center"},r.a.createElement("div",{className:"text-center"},r.a.createElement("a",{className:"btn btn-social-icon btn-google",href:"http://google.com/+"},r.a.createElement("i",{className:"fa fa-google-plus"})),r.a.createElement("a",{className:"btn btn-social-icon btn-facebook",href:"http://www.facebook.com/profile.php?id="},r.a.createElement("i",{className:"fa fa-facebook"})),r.a.createElement("a",{className:"btn btn-social-icon btn-linkedin",href:"http://www.linkedin.com/in/"},r.a.createElement("i",{className:"fa fa-linkedin"})),r.a.createElement("a",{className:"btn btn-social-icon btn-twitter",href:"http://twitter.com/"},r.a.createElement("i",{className:"fa fa-twitter"})),r.a.createElement("a",{className:"btn btn-social-icon btn-google",href:"http://youtube.com/"},r.a.createElement("i",{className:"fa fa-youtube"})),r.a.createElement("a",{className:"btn btn-social-icon",href:"mailto:"},r.a.createElement("i",{className:"fa fa-envelope-o"}))))),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-auto"},r.a.createElement("p",null,"\xa9 Copyright 2020 Pizza4All")))))},P=a(20),R=a(5),_=function(){return{type:"DISHES_LOADING"}},q=function(e){return{type:"DISHES_FAILED",payload:e}},H=function(e){return{type:"ADD_DISHES",payload:e}},B=function(e){return{type:"COMMENTS_FAILED",payload:e}},Y=function(e){return{type:"ADD_COMMENTS",payload:e}},U=function(){return{type:"PROMOS_LOADING"}},G=function(e){return{type:"PROMOS_FAILED",payload:e}},J=function(e){return{type:"ADD_PROMOS",payload:e}},W=function(){return{type:"LEADERS_LOADING"}},K=function(e){return{type:"ADD_LEADERS",payload:e}},Z=function(e){return{type:"LEADERS_FAILED",payload:e}},$=a(45),Q=function(e){Object(m.a)(a,e);var t=Object(i.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.fetchDishes(),this.props.fetchComments(),this.props.fetchPromos(),this.props.fetchLeaders()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(T,null),r.a.createElement($.TransitionGroup,null,r.a.createElement($.CSSTransition,{key:this.props.location.key,classNames:"page",timeout:300},r.a.createElement(g.f,null,r.a.createElement(g.e,{path:"/home",component:function(){return r.a.createElement(p,{dish:e.props.dishes.dishes.filter((function(e){return e.featured}))[0],dishesLoading:e.props.dishes.isLoading,dishesErrMess:e.props.dishes.errMess,promotion:e.props.promotions.promotions.filter((function(e){return e.featured}))[0],promosLoading:e.props.promotions.isLoading,promosErrMess:e.props.promotions.errMess,leader:e.props.leaders.leaders.filter((function(e){return e.featured}))[0],leadersLoading:e.props.leaders.isLoading,leadersErrMess:e.props.leaders.errMess})}}),r.a.createElement(g.e,{exact:!0,path:"/menu",component:function(){return r.a.createElement(N,{dishes:e.props.dishes})}}),r.a.createElement(g.e,{path:"/menu/:dishId",component:function(t){var a=t.match;return r.a.createElement(I,{dish:e.props.dishes.dishes.filter((function(e){return e.id===parseInt(a.params.dishId,10)}))[0],isLoading:e.props.dishes.isLoading,errMess:e.props.dishes.errMess,comments:e.props.comments.comments.filter((function(e){return e.dishId===parseInt(a.params.dishId,10)})),commentsErrMess:e.props.comments.errMess,postComment:e.props.postComment})}}),r.a.createElement(g.e,{exact:!0,path:"/contactus",component:function(){return r.a.createElement(j,{resetFeedbackForm:e.props.resetFeedbackForm,postFeedback:e.props.postFeedback})}}),r.a.createElement(g.e,{exact:!0,path:"/aboutus",component:function(){return r.a.createElement(S,{leaders:e.props.leaders})}}),r.a.createElement(g.d,{to:"/home"})))),r.a.createElement(z,null))}}]),a}(n.Component),V=Object(g.g)(Object(P.connect)((function(e){return{dishes:e.dishes,comments:e.comments,promotions:e.promotions,leaders:e.leaders}}),(function(e){return{postComment:function(t,a,n,r){return e(function(e,t,a,n){return function(r){var l={dishId:e,rating:t,author:a,comment:n};return l.date=(new Date).toISOString(),fetch(E+"comments",{method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/json"},credentials:"same-origin"}).then((function(e){if(e.ok)return e;var t=new Error("Error "+e.status+": "+e.statusText);throw t.response=e,t}),(function(e){throw new Error(e.message)})).then((function(e){return e.json()})).then((function(e){return r(function(e){return{type:"ADD_COMMENT",payload:e}}(e))})).catch((function(e){console.log("Post comments",e.message),alert("Your comment could not be posted\nError: "+e.message)}))}}(t,a,n,r))},postFeedback:function(t){return e((a=t,function(e){var t=Object(R.a)(Object(R.a)({},a),{},{date:(new Date).toISOString()});return fetch(E+"feedback",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"},credentials:"same-origin"}).then((function(e){if(e.ok)return e;var t=new Error("Error "+e.status+": "+e.statusText);throw t.response=e,t}),(function(e){throw new Error(e.message)})).then((function(e){return e.json()})).then((function(e){return alert("Thank you for your feedback!\n"+JSON.stringify(e))})).catch((function(e){console.log("Post feedback ",e.message),alert("Your feedback could not be posted\nError: "+e.message)}))}));var a},fetchDishes:function(){e((function(e){return e(_(!0)),fetch(E+"dishes").then((function(e){if(e.ok)return e;var t=new Error("Error "+e.status+": "+e.statusText);throw t.response=e,t}),(function(e){throw new Error(e.message)})).then((function(e){return e.json()})).then((function(t){return e(H(t))})).catch((function(t){return e(q(t.message))}))}))},resetFeedbackForm:function(){e(y.actions.reset("feedback"))},fetchComments:function(){e((function(e){return fetch(E+"comments").then((function(e){if(e.ok)return e;var t=new Error("Error "+e.status+": "+e.statusText);throw t.response=e,t}),(function(e){throw new Error(e.message)})).then((function(e){return e.json()})).then((function(t){return e(Y(t))})).catch((function(t){return e(B(t.message))}))}))},fetchPromos:function(){e((function(e){return e(U(!0)),fetch(E+"promotions").then((function(e){if(e.ok)return e;var t=new Error("Error "+e.status+": "+e.statusText);throw t.response=e,t}),(function(e){throw new Error(e.message)})).then((function(e){return e.json()})).then((function(t){return e(J(t))})).catch((function(t){return e(G(t.message))}))}))},fetchLeaders:function(){e((function(e){return e(W(!0)),fetch(E+"leaders").then((function(e){if(e.ok)return e;var t=new Error("Error"+e.status+": "+e.statusText);throw t.response=e,t}),(function(e){throw new Error(e.message)})).then((function(e){return e.json()})).then((function(t){return e(K(t))})).catch((function(t){return e(Z(t.message))}))}))}}}))(Q)),X=(a(155),a(21)),ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLoading:!0,errMess:null,dishes:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_DISHES":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!1,errMess:null,dishes:t.payload});case"DISHES_LOADING":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!0,errMess:null,dishes:[]});case"DISHES_FAILED":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!1,errMess:t.payload,dishes:[]});default:return e}},te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{errMess:null,comments:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_COMMENTS":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!1,errMess:null,comments:t.payload});case"COMMENTS_FAILED":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!1,errMess:t.payload,comments:[]});case"ADD_COMMENT":var a=t.payload;return Object(R.a)(Object(R.a)({},e),{},{comments:e.comments.concat(a)});default:return e}},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLoading:!0,errMess:null,promotions:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_PROMOS":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!1,errMess:null,promotions:t.payload});case"PROMOS_LOADING":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!0,errMess:null,promotions:[]});case"PROMOS_FAILED":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!1,errMess:t.payload,promotions:[]});default:return e}},ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLoading:!0,errMess:null,leaders:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_LEADERS":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!1,errMess:null,leaders:t.payload});case"LEADERS_LOADING":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!0,errMess:null,leaders:[]});case"LEADERS_FAILED":return Object(R.a)(Object(R.a)({},e),{},{isLoading:!1,errMess:t.payload,leaders:[]});default:return e}},re=a(89),le=a.n(re),se=a(90),ce=a.n(se),oe={firstname:"",lastname:"",telnum:"",email:"",agree:!1,contactType:"Tel.",message:""},me=Object(X.createStore)(Object(X.combineReducers)(Object(R.a)({dishes:ee,comments:te,promotions:ae,leaders:ne},Object(y.createForms)({feedback:oe}))),Object(X.applyMiddleware)(le.a,ce.a)),ie=function(e){Object(m.a)(a,e);var t=Object(i.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement(P.Provider,{store:me},r.a.createElement(g.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(V,null))))}}]),a}(n.Component);s.a.render(r.a.createElement(ie,null),document.getElementById("root"))},91:function(e,t,a){e.exports=a(156)}},[[91,1,2]]]);
//# sourceMappingURL=main.2edeb3aa.chunk.js.map