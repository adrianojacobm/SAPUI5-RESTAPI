sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sapui5-front/Request/HttpRequest"

], function (Controller, MessageToast,JSONModel,HttpRequest) {
	"use strict";

	return Controller.extend("sapui5-front.controller.App", {


		onInit : function(){			
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("editUser").attachMatched(this._onRouteMatched, this);

			this.User = {
				Nome: "",
				Nome: "",
				DataNasc:"",
				Email : 'password',
				Cpf : ""			
			};	

		},

        _onRouteMatched : function (oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").userId,
				model: "user"
            });
            
			this.userId = this.getView().mObjectBindingInfos.user.path.replace("/","");
			
			this.getUserBy(this.userId);
		},
		
		getUserBy(userId)
		{
			let promise = HttpRequest.GetById(`http://localhost:8080/Cliente/${userId}`);

			promise.then(data=>{
				this.User.Id = data.Id;
				this.User.Nome = data.Nome;
				this.User.DataNasc = this.formatDate(data.DataNasc);
				this.User.Email = data.Email;
				this.User.Cpf = data.Cpf;

				let model = new JSONModel();

				model.setData(this.User);
				this.oView.setModel(model);
	
			});

		},

		onUpdate : function(oEvent)
		{
			this.User.Nome = this.byId("userNome").getValue();
			this.User.DataNasc = this.byId("userDataNasc").getValue();		
			this.User.Email = this.byId("userEmail").getValue();		
			this.User.Cpf = this.byId("userCpf").getValue();	

			let userJSON = this.ToJson();	
						
			let result = HttpRequest.Put(`http://localhost:8080/Cliente/`,userJSON);

			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			result.then(data =>{
				oRouter.navTo("index");
			});
			
		},

		ToJson:function()
		{
			let json = {};
	
			Object.keys(this.User).forEach(key =>{
				json[key] = this.User[key];
			});
	
			return json;
		},

		onSave : function(oEvent)
		{
			this.User.Nome = this.byId("userNome").getValue();
			this.User.DataNasc = this.byId("userDataNasc").getValue();		
			this.User.Email = this.byId("userEmail").getValue();		
			this.User.Cpf = this.byId("userCpf").getValue();	

			let userJSON = this.ToJson();	

			let result = HttpRequest.Post(`http://localhost:8080/Cliente/`,userJSON);
			
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			result.then(data =>{
				oRouter.navTo("index");
			});

		},

		validUser : function(user)
		{

		},

		formatDate : function(date) 
		{
			var d = new Date(date),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();
		  
			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;
		  
			return [day, month, year].join('/');
		  
		}		
		
	});

});