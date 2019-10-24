
  function check_update()
    {
      var checkbox = document.getElementsByName("id");
      console.log(checkbox);
      var checkboxleng = checkbox.length;
      var post
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
      else if(checked == 1)
      {
        alert("수정할 항목을 2개 이상 선택하세요.");
      }
      else
      {
        choose=confirm("선택한 항목을 수정하시겠습니까?");
        if(choose)
        {
          console.log('update작동');
          document.frm.action = '/update';
          document.frm.submit();
        }
        else
        {
          return false;
        }
      }
    }
    function update_process()
      {
        var checkbox = document.getElementsByName("fault");
        console.log(checkbox);
        var checkboxleng = checkbox.length;
        var post
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
        if(checked == 200000)
        {
          alert("err.");
        }
        else
        {
          choose=confirm("체크한 항목으로 수정하시겠습니까?");
          if(choose)
          {
            document.frm.action = `/update_process`;
            document.frm.submit();
            window.opener.location.reload();
          }
          else
          {
            return false;
          }
        }
      }
    function check_delete()
      {
        var checkbox = document.getElementsByName("id");
        console.log(checkbox);
        var checkboxleng = checkbox.length;
        var count = document.checked;
        var post
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
          alert("삭제할 항목이 체크되지 않았습니다.");
        }
        else
        {
          choose=confirm("선택한 항목을 삭제하시겠습니까?");
          if(choose)
          {
            document.frm.action = `/user_delete`;
            document.frm.submit();
          }
          else
          {
            return false;
          }
        }
      }

      function showPopup(select_num)
      {
        window.open(`/page/${select_num}`, "a", "width=850, height=400, left=100, top=50");
      }

      function reload() {
        window.location.reload(true);
      }
<<<<<<< HEAD
      function test()
      {
        show = document.getElementsByName("fault"); //상세보기 페이지 내에 체크박스 이름은 check 수정페이지 내에 체크박스 이름은 fault
        val = document.getElementsByName("hidden_check");

        for(var i = 0; i < val.length; i++) // 사용자가 이전에 선택한 고장 목록은 체크되게함
        {
          nick = val[i].value-1;
          show[nick].checked=true;
        }
      }
      function allcheck() //전체체크 , 해제
        {

          show_box = document.getElementsByName("fault");
          all = document.getElementsByName("all");

          if(all.checked == 1 )
          {
            all.checked = false;
            for(var i = 0; i < 25; i++) // 사용자가 이전에 선택한 고장 목록은 체크되게함
            {
              show_box[i].checked=true;
            }
          }
          else
          {
            all.checked = true;
            for(var i = 0; i < 25; i++) // 사용자가 이전에 선택한 고장 목록은 체크되게함
            {
              show_box[i].checked=false;
            }
          }
        }
=======

      function InsertPopup()
      {
        window.open(`/insertuser`, "a", "width=520, height=300, left=100, top=50");
      }
>>>>>>> 709f81a4d796362ef5127d7c2f0d704486ad21d9
