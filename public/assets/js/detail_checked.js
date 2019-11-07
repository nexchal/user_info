
function DetailChecked()
  {
    var checkbox = document.getElementsByName("fault"); // 선택된 고장목록 체크박스 값
    var checkboxleng = checkbox.length; // 선택된 체크박스 길이
    var checked = 0; // 선택된 체크박스 개수
    var i = 0;
    for (i=0; i<checkboxleng; i++)
    {
      if(checkbox[i].checked == true)
      {
        checked +=1;
      }
    }
    document.frm.checked.value=checked;
    if(checked == 20000) // 예외처리
    {
      alert("err");
    }
    else
    {
      choose=confirm("선택한 항목을 수정하시겠습니까?");
      if(choose)
      {
        document.frm.action = `/insert`;
        document.frm.submit();
        window.opener.location.reload();
      }
      else
      {
        return false;
      }
    }
  }
  function AddType() // 추가버튼 클릭 시 fault유형 목록들을 보여줌
   {
     var x = document.getElementById("myDIV");
     var y = document.getElementById("save");

     if (x.style.display === "none" && y.style.display === "none")
     {
       x.style.display = "block";
       y.style.display = "block";

     }
     else
     {
       x.style.display = "none";
       y.style.display = "none";
     }

     show_box = document.getElementsByName("fault"); // fault 유형 값을 가지고 있는 체크박스 name
     val = document.getElementsByName("hidden_check"); // 현재 보고있는 사용자가 가지고있는 fault 유형 값

     for(var i = 0; i < val.length; i++) // 상세보기 페이지에서 사용자가 이전에 선택한 고장 목록은 체크되게함
     {
       nick = val[i].value-1
      show_box[nick].checked=true;
     }
   }
