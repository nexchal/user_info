function ch()
  {
    var checkbox = document.getElementsByName("check");
    var checkboxleng = checkbox.length;
    var checked = 0;
    var i = 0;
    for (i=0; i<checkboxleng; i++)
    {
      if(checkbox[i].checked == true)
      {
        checked +=1;
      }
    }
    document.frm.checked.value=checked;
    if(checked == 0)
    {
      alert("수정할 항목이 체크되지 않았습니다.");
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

  function myFunction()
  {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none")
    {
      x.style.display = "block";
    }
    else
    {
      x.style.display = "none";
    }

    show_box = document.getElementsByName("check");
    val = document.getElementsByName("user_selected_value");

    for(var i = 0; i < val.length; i++) // 사용자가 이전에 선택한 고장 목록은 체크되게함
    {
      nick = val[i].value-1
     show_box[nick].checked=true;
    }
  }