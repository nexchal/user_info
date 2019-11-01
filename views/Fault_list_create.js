function FaultList(_list) //고장목록 생성
{
  var data='';
      for(var i=0; i < _list.length; i++)
      {
        if(i % 5 == 0)
        {
          data = data +
          ` <tr><td><label><input type="checkbox" name="fault" value="${_list[i][0]}"> ${_list[i][1]} </label></td>`
        }
        else
        {
          data = data +
          `<td><label><input type="checkbox" name="fault" value="${_list[i][0]}"> ${_list[i][1]} </label></td>`
        }
      }
      data = `<table id = detail>` + data + `</table>`;
      return data;
}

module.exports={
    FaultList,
}
