function UserinfoCreatelist(_list)//유저리스트 생성
{
  var data='';
      for(var i=0; i < _list.length; i++)
      {
        data += `

          <tr class="item">
            <td class = "name"><a href='#' onclick="showPopup(${_list[i][0]})">${_list[i][0]}</a></td>
            <td class = "name">${_list[i][1]}</td>
            <td class = "name">${_list[i][2]}</td>
            <td class = "name">${_list[i][3]}</td>
            <td class = "name">${_list[i][4]}</td>
            <td class = "name">${_list[i][5]}</td>
            <td class = "name">${_list[i][6]}</td><input type = "hidden" value = "${_list[i][6]}" name = "id">
            <td><input type ="checkbox" name="check" value = "${_list[i][2]}"></td>
          </tr></div>`;
      }
      return data;
}

module.exports={
    UserinfoCreatelist,

}
