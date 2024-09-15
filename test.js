const prompt = require('prompt-sync')();
// const Today=new Date() 
// const dayOfWeek=Today.getDay() 
// const dayUntilMonday=(dayOfWeek+6)%7 
// const LastMonday=new Date(Today) 
// LastMonday.setDate(Today.getDate()-dayUntilMonday) 
// const arr=['2024-02-10','2024-03-05','2024-10-07','2025-05-05']
// arr.sort((a,b)=>new Date(b.date)+new Date(a.date))
// console.log(arr);
// console.log(new Date(arr[1]));


let button1=''
// let button2=''
// button2=prompt("enter ! to End : ")
// while(button1!='`'){
//     Questions()
//     button1=prompt("enter ` to End are you ready? : ")
// }
function Questions(){
    q1=prompt("what is your first name ?:")
    q2=prompt("what is your age?: ")
    q2=prompt("what is the result of 5+5?: ")
    console.log("ok nideeee");
    console.log("Now Let's check the answers");
    if(q2==10){
        console.log("Niceee All the answers is EXCELLENT ✔");
    }
    else{
        console.log("Noooo it's WRONGGG ❌");
    }
}


// -------------------------------------------------------------------




<%const aggregatedData = dataArray.reduce((acc, currentItem) => {%>
    <%if (acc[currentItem.name]) {%>
        <%acc[currentItem.name] += currentItem.price;%>
    <%} else {%>
        <%acc[currentItem.name] = currentItem.price;%>
    <%}%>
    <%return list(acc)%>
<%}, {});%>




































<% let sumOut=0%>
                <%DateFilter.reduce((total, item) => {%>
                    <% sumOut+=item.Out%>
                    <%if (total[item.Name]) {%>
                        <%total[item.Name] += item.Out;%>
                    <%} else {%>
                        <%total[item.Name] = item.Out;%>
                    <%}%>
                    <% if (item.Out!=null && item.Out!=0) { %>
                        <tr>
                            <td><%= index+1 %></td>
                            <td><%= item.Name %></td>
                            <td><%= item.Work %></td>
                            <td><%= item.Price %></td>
                            <td><%= item.Out %></td>
                            <td class="note"><%= item.Note %></td>
                            <td><%= moment(item.Date).format('YYYY-MM-DD') +' '+' '+ '('+ moment(item.Date).format('ddd')+')' %></td>
                            <td class="td">
                                <div class="buttons">
                                <!-- ------------------------------------------------------------------------------------------------------------------------- -->
                                <% if (!item.Price) { %>
                                    <%item.Price=0 %>
                                    <%}%>
                                <% if (!item.Out) { %>
                                    <%item.Out=0 %>
                                <% }%>
                                <form   class="deleteForm" action="/Top-Laser-Monthely/<%= item._id %>?_method=DELETE"  method="post">
                                    <button id="deletee" class="delete" style="cursor: pointer" type="submit" onclick="DeleteFunction(event)">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </form>
                                <form action="/Top-Laser-Monthely/<%=item._id%>/<%=item.Price%>/<%=item.Out%>?_method=PUT" method="post" >
                                    <button id="✔"   DataId="<%=item._id%>" DataOut="<%= item.Out %>" DataPrice="<%= item.Price %>">✔</button>
                                </form>
                                        <form action="/Top-Laser-Monthely/<%=item._id%>?_method=POST" method="post">
                                            <input name="OutNew" type="text" style="width: 18px; height: 20px;" >
                                            <button style="display: none;" type="submit" id="update" ><i class="fa-solid fa-arrows-rotate"></i></button>
                                        </form>
                                </div>
                            </td>
                        </tr>
                    <% } %>

                <%}, {});%>
                

                
        </tbody>
    </table>