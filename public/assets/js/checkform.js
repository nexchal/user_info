
  function CheckUpdate()
    {
      var checkbox = document.getElementsByName("id"); // 메인페이지 유저목록 테이블에서 선택한 체크박스 값
      console.log(checkbox);
      var checkboxleng = checkbox.length; //체크박스 전체길이
      var post
      var checked = 0;
      var i = 0;
      for (i=0; i<checkboxleng; i++) // 체크된 체크박스 갯수 확인
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

    function UpdateProcess()
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
    function CheckDelete()
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

      function ShowPopup(select_num) // 상세보기 페이지 클릭 시 팝업으로
      {
        window.open(`/page/${select_num}`, "a", "width=1069, height=418, left=100, top=50");
      }

      function Reload() {             //새로고침
        window.location.reload(true);
      }

      function TypeCheck()
      {
        show = document.getElementsByName("fault");
        val = document.getElementsByName("hidden_check");

        val[]



        for(var i = 0; i < val.length; i++) // 사용자가 이전에 선택한 고장 목록은 체크되게함
        {
          nick = val[i].value-1;
          show[nick].checked=true;
        }

      }


      function Allcheck() //전체체크 , 해제
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
      function InsertPopup() // 사용자 추가 시 팝업으로 생성
      {
        window.open(`/insertuser`, "a", "width=525, height=300, left=100, top=50");
      }
