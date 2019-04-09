sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sapui5-front/Request/HttpRequest",
	'sap/m/MessageBox'

], function (Controller, MessageToast,JSONModel,HttpRequest,MessageBox) {
	"use strict";

	return Controller.extend("sapui5-front.controller.App", {

		onInit : function(){					
			this.fillLines();	
			
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("index")
			.attachPatternMatched(this.navBack, this);
		},	

		fillLines:function()
		{
			let request = HttpRequest.Get("http://localhost:8080/Cliente");
			let model = new JSONModel();

			request.then(data=>{
				data.forEach(user => {
					user.DataNasc = this.formatDate(user.DataNasc);
				});
				model.setData(data);
			});

			let usersTable = this.byId("usersTable");	

			usersTable.setModel(model,"users");
		},

		onPressApagarButton:function(oEvent)
		{
			let user = this.getUserFromTable(oEvent);

			let that = this;

			MessageBox.show(
				"Deseja remover esse usuário?", {
					icon: MessageBox.Icon.INFORMATION,
					title: "ATENÇÃO",
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function(oAction) 
					{
						if(oAction == "YES")
						{
							let request = HttpRequest.Delete(`http://localhost:8080/Cliente/${user.Id}`);
							request.then(data=>{
								that.fillLines();
							});	
						}

					}
				}
			);
		},

		onPressEditarButton: function(oEvent)
		{

			let user = this.getUserFromTable(oEvent);
			
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("editUser",{
				userId : user.Id
			});
			
		},

		getUserFromTable: function(oEvent)
		{
			let index = oEvent.getSource().oParent.oBindingContexts.users.sPath.replace("/","");
			
			let usersTable = this.byId("usersTable");	

			let user = usersTable.oModels.users.oData[index];

			return user;
		},

		onNewUser : function(oEvent)
		{
			let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("newUser");			
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
		  
		},

		navBack: function(oEvent){
			this.fillLines();	
	   }					

	});

});