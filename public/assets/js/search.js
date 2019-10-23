
      function filter()
      {
        var value, name, item, i;
        value = document.getElementById("value").value.toUpperCase();
        item = document.getElementsByClassName("item");

        for(i=0;i<item.length;i++)
        {
          name = item[i].getElementsByClassName("name");
          for(var j=0; j < name.length; j++)
          {
            if(name[j].innerHTML.toUpperCase().indexOf(value) > -1)
            {
              item[i].style.visibility ="visible";
              break;
            }
            else
            {
              item[i].style.visibility = "collapse";
            }
          }
        }
      }
