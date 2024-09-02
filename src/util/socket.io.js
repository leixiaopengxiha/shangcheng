import { use } from "element-plus/lib/locale";
import { io } from "socket.io-client";
import { ref } from "vue";
// 创建一个用于存储socket实例的ref
const socket = ref(null);
 
// 创建一个用于连接socket的函数
function connectSocket(url) {
  socket.value = io(url);
}
 
// 创建一个用于监听socket事件的函数
function onSocketEvent(event, callback) {
  if (socket.value) {
    socket.value.on(event, callback);
  }
}
 
// 创建一个用于发送消息到socket的函数
function emitSocketEvent(event, data) {
  let userList = JSON.parse(sessionStorage.getItem("userList"));
  console.log(userList);
  if (socket.value) {
    data = {userInformation:userList,...data}
    socket.value.emit(event, data);
  }
}
 
// 导出socket和相关函数
export { socket, connectSocket, onSocketEvent, emitSocketEvent };