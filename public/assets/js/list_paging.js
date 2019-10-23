
//만들어진 테이블에 페이지 처리

function listchange()//view list numberchange
{
	var view = document.frm.list;//view list load
	var index = view.selectedIndex; // select index
	var value = view.options[index].value; // select index value
  localStorage.setItem('list', index); //saved view selected index of localStorage
	page(value); //paging
}

$(function(){
  // table pagination
	var view = document.frm.list;
  view.selectedIndex=localStorage.getItem('list');
	var setRows = $('[name="list"]').val() * 1;
  page(setRows);

});
