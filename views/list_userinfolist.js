function UserinfoCreatelist(_list)//유저리스트 생성
{
  var data='';
      for(var i=0; i < _list.length; i++)
      {
        data += `
        <tr>
            <td><a href='#' onclick="showPopup(${_list[i][0]})">${_list[i][0]}</a></td>
            <td>${_list[i][1]}</td>
            <td>${_list[i][2]}</td>
            <td>${_list[i][3]}</td>
            <td>${_list[i][4]}</td>
            <td>${_list[i][5]}</td>
            <td>${_list[i][6]}</td>
            <td><input type ="checkbox" name="id" value = "${_list[i][6]}"></td>
          </tr>`;
      }
      return data;
}

function UpdateUserinfoCreatelist(_list)//유저리스트 생성
{
  var data='';
      for(var i=0; i < _list.length; i++)
      {
        data += `
        <tr>
            <td><a href='#' onclick="showPopup(${_list[i][0]})">${_list[i][0]}</a></td>
            <td>${_list[i][1]}</td>
            <td>${_list[i][2]}</td>
            <td>${_list[i][3]}</td>
            <td>${_list[i][4]}</td>
            <td>${_list[i][5]}</td>
            <td>${_list[i][6]}</td>
            <td><input type ="hidden" name="id" value = "${_list[i][6]}"></td>
          </tr>`;
      }
      return data;
}

module.exports={
    UserinfoCreatelist,
    UpdateUserinfoCreatelist

}
