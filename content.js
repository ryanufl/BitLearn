let replaced = document.body.innerHTML.replace(/\$/g, '$DOLLAR$<span title="This page was edited" class="dollar">');
document.body.innerHTML = replaced;
