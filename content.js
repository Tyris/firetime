const MAX_TIME = 32503679999; // 2999/12/31
const MIN_TIME = 946684800; // 2000/01/01

var observer = new MutationObserver(function(mutations) {
  var inputs = document.getElementsByClassName('valueedit');
  for (var i = 0, l = inputs.length; i < l; i++) {
    var node = inputs[i];
    var time = Number(node.value) / 1000;
    if (isNaN(time) || time < MIN_TIME || time > MAX_TIME) {
      continue; // probably not a date
    }
    if (node.nextSibling && node.nextSibling.className == "firetime") {
      continue;
    }
    var fireTime = document.createElement("span");
    fireTime.className = "firetime";
    fireTime.appendChild(document.createTextNode(moment.unix(time).calendar(null, {
      sameElse: 'LLL'
    })));
    node.parentNode.insertBefore(fireTime, node.nextSibling);
  }
});

observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});
