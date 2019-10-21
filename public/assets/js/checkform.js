
  function check_update()
    {
      var checkbox = document.getElementsByName("check");
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
        var checkbox = document.getElementsByName("check");
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
        var checkbox = document.getElementsByName("check");
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
