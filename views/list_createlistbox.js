function Createview(_area, _reason, _station, _logicname)//유저 리스트 보기 리스트박스
{

  var view=`&nbsp <select name='view' onchange="ViewChange()">
      <option value='0' selected>-- 선택 --</option>
      <option value='all'>전체</option>
      <option value='area'>지역</option>
      <option value='logic'>고장로직</option>
  </select>`;

  view += `&nbsp <select name ='area' style="display:none">
  <option value='0' selected>-- 선택 --</option>`
  for(var i=0; i< _area.length; i++)
  {
    view += `<option value ='${_area[i]}'>${_area[i]}</option>`;
  }
  view += `</select> &nbsp
  <select name ='reason' style="display:none">
  <option value='0' selected>-- 선택 --</option>`;
  for(var i=0; i < _reason.length; i++)
  {
    view += `<option value ='${_reason[i]}'>${_reason[i]}</option>`;
  }
  view += `</select> &nbsp <select name ='station' style="display:none">
  <option value='0' selected>-- 선택 --</option>`;
  for(var i = 0; i < _station.length; i++)
  {
    view += `<option value ='${_station[i]}'>${_station[i]}</option>`;
  }
  view += `</select> &nbsp <select name ='logic' style="display:none">
  <option value='0' selected>-- 선택 --</option>`;
  for(var i=0; i< _logicname.length; i++)
  {
    view += `<option value ='${_logicname[i][1]}'>${_logicname[i][1]}</option>`;
  }
  view += `</select> &nbsp <input type="button" class = "searchbutton" value="검색" onclick="Userview()">`;
  return view;
}

function CreateCategory(_area,_reason,_station)
{
  var view=``;
  view += ` <select name ='area'>
  <option value='0' selected>-- 선택 --</option>`
  for(var i=0; i< _area.length; i++)
  {
    view += `<option value ='${_area[i]}'>${_area[i]}</option>`;
  }
  view += `</select> <select name ='reason'>
  <option value='0' selected>-- 선택 --</option>`;
  for(var i=0; i < _reason.length; i++)
  {
    view += `<option value ='${_reason[i]}'>${_reason[i]}</option>`;
  }
  view += `</select> <select name ='station'>
  <option value='0' selected>-- 선택 --</option>`;
  for(var i = 0; i < _station.length; i++)
  {
    view += `<option value ='${_station[i]}'>${_station[i]}</option>`;
  }
  view += `</select>`;
  return view;
}
module.exports ={
  Createview,
  CreateCategory
}
