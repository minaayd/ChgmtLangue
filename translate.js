  function Translate() {
    this.init = function(attribute, lng){
      this.attribute = this.attribute;
      this.lng = lng;
    }
    this.process = function() {
      _self=this;
      var xrhFile=new XMLHttpRequest();
      xrhFile.open("GET", "lng/" +this.lng+".json", false);
      xrhFile.onreadystatechange=function() {
        if (xrhFile.readyState===4) {
          if (xrhFile.status===200 || xrhFile.status ==0) {
            var LngObject =JSON.parse(xrhFile.responseText);
            var allDom = document.getElementsByTagName("*");
            for (var i = 0; i<allDom.length; i++) {
              var elem = allDom[i];
              var key=elem.getAttribute(_self.attribute);
              if (key !==null) {
                elem.innerHTML=LngObject[key];
              }
            }
          }
        }
      }
  }

  