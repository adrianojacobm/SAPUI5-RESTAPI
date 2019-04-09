sap.ui.define([
    
  ], function () {
      "use strict";
    return {

        
        Get:function(url,params = {}) 
        {       
            return  this.Request('get',url,params);
        
        },

        Delete:function(url,params = {})
        {
            return this.Request('DELETE',url,params);
        },
    
        Put:function(url,params = {})
        {
            return this.Request('PUT',url,params);
        },
    
        Post:function(url,params = {})
        {
            return this.Request('POST',url,params);
        },

        GetById:function(url,params = {})
        {
            return this.Request('GET',url,params);
        },

        Request:function(method,url,params = {})
        {
            return new Promise((resolve,reject)=>
            {
    
                let request;
    
                switch(method.toUpperCase())
                {
                    case 'GET':
    
                        request = url;
    
                    break;
    
                    default:
    
                        console.log(method);
                        console.log(params);
                        
    
                        request = new Request(url,{
                            method: method,
                            body: JSON.stringify(params),
                            headers: new Headers({'Content-Type':'application/json'})
                        });
    
                        console.log(request);
    
    
                    break;
                }
    
    
                fetch(request)
                .then(response =>
                {
                        
                    response.json().then(json=>
                    {
    
                        resolve(json);
    
                    })
                    .catch(e=>
                    {
    
                        reject(e);
    
                    });
    
                })
                .catch(e=>
                {
    
                    reject(e);
    
                });;
    
            });
    
                
        }
  
    };

  
  }, true);