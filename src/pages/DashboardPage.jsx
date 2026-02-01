// // ============================================
// // DASHBOARD PAGE - COMPLETE VERSION
// // المسار: src/pages/DashboardPage.jsx
// // ============================================

// import React, { useState, useEffect, useMemo } from 'react';
// import { LayoutDashboard, ShoppingBag, Users, Package, Bell, Settings, Menu, X, LogOut, Sun, Moon, Search, Eye, DollarSign, AlertCircle, Lock, CheckCircle, Clock, Loader } from 'lucide-react';

// import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// // ============================================
// // CONFIGURATION
// // ============================================
// const ADMIN_PASSWORD = "kavoral2025"; // ⚠️ غيّر الباسورد ده
// const GOOGLE_SHEETS_URL = process.env.REACT_APP_GOOGLE_SHEETS_URL || ""; // من ملف .env

// // ============================================
// // LOGIN PAGE
// // ============================================
// const LoginPage = ({ onLogin, isDark, setIsDark }) => {
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     setTimeout(() => {
//       if (password === ADMIN_PASSWORD) {
//         onLogin(true);
//         try {
//           window.storage?.set('kavoral_admin_auth', 'true');
//         } catch (err) {
//           localStorage.setItem('kavoral_admin_auth', 'true');
//         }
//       } else {
//         setError('كلمة المرور غير صحيحة');
//       }
//       setIsLoading(false);
//     }, 500);
//   };

//   return (
//     <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-teal-50'}`}>
//       <button
//         onClick={() => setIsDark(!isDark)}
//         className={`fixed top-4 left-4 p-3 rounded-xl ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} shadow-lg hover:scale-110 transition-transform`}
//       >
//         {isDark ? <Sun size={20} /> : <Moon size={20} />}
//       </button>

//       <div className={`max-w-md w-full ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//         <div className="text-center mb-8">
//           <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//             <Lock size={40} className="text-white" />
//           </div>
//           <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>Kavoral Dashboard</h1>
//           <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>تسجيل الدخول للوحة التحكم</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//               كلمة المرور
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="أدخل كلمة المرور"
//               className={`w-full px-4 py-3 rounded-xl border-2 ${
//                 isDark 
//                   ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
//                   : 'bg-white border-gray-200 text-gray-800'
//               } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
//               required
//             />
//           </div>

//           {error && (
//             <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-700">
//               <AlertCircle size={20} />
//               <span className="text-sm font-semibold">{error}</span>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
//           >
//             {isLoading ? (
//               <>
//                 <Loader size={20} className="animate-spin" />
//                 جاري التحقق...
//               </>
//             ) : (
//               'دخول'
//             )}
//           </button>
//         </form>

//         <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
//           <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>
//             🔒 محمي بكلمة مرور • للإدارة فقط
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // DASHBOARD COMPONENT
// // ============================================
// const Dashboard = ({ onLogout, isDark, setIsDark }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     setIsLoading(true);
//     try {
//       if (GOOGLE_SHEETS_URL) {
//         const response = await fetch(`${GOOGLE_SHEETS_URL}?action=getOrders`);
//         if (response.ok) {
//           const data = await response.json();
//           setOrders(data.orders || []);
//         } else {
//           throw new Error('Failed to fetch');
//         }
//       } else {
//         // Mock data للتجربة
//         setOrders([
//           { 
//             orderNumber: 'ORD-001', 
//             customerName: 'أحمد محمد', 
//             phone: '01012345678',
//             governorate: 'القاهرة',
//             address: 'مدينة نصر، القاهرة',
//             items: [{ name: 'زيت الأرغان', quantity: 2, price: 200 }],
//             total: 400,
//             timestamp: '2025-10-24 10:30',
//             status: 'pending'
//           },
//           { 
//             orderNumber: 'ORD-002', 
//             customerName: 'فاطمة علي', 
//             phone: '01087654321',
//             governorate: 'الجيزة',
//             address: 'الهرم، الجيزة',
//             items: [{ name: 'زيت الورد', quantity: 1, price: 220 }],
//             total: 220,
//             timestamp: '2025-10-24 14:15',
//             status: 'processing'
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setOrders([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateOrderStatus = async (orderNumber, newStatus) => {
//     try {
//       if (GOOGLE_SHEETS_URL) {
//         await fetch(GOOGLE_SHEETS_URL, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             action: 'updateStatus',
//             orderNumber,
//             status: newStatus
//           })
//         });
//       }
      
//       setOrders(orders.map(order => 
//         order.orderNumber === orderNumber 
//           ? { ...order, status: newStatus } 
//           : order
//       ));
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };

//   const stats = {
//     totalOrders: orders.length,
//     todayOrders: orders.filter(o => o.timestamp?.includes('2025-10-24')).length,
//     totalSales: orders.reduce((sum, o) => sum + (o.total || 0), 0),
//     pendingOrders: orders.filter(o => o.status === 'pending').length,
//     completedOrders: orders.filter(o => o.status === 'completed').length,
//     processingOrders: orders.filter(o => o.status === 'processing').length,
//   };

//   const salesChartData = [
//     { day: 'السبت', sales: 2400 },
//     { day: 'الأحد', sales: 3200 },
//     { day: 'الاثنين', sales: 2800 },
//     { day: 'الثلاثاء', sales: 4100 },
//     { day: 'الأربعاء', sales: 3500 },
//     { day: 'الخميس', sales: 4500 },
//     { day: 'الجمعة', sales: stats.totalSales },
//   ];

//   const statusData = [
//     { name: 'قيد الانتظار', value: stats.pendingOrders, color: '#f59e0b' },
//     { name: 'قيد التنفيذ', value: stats.processingOrders, color: '#3b82f6' },
//     { name: 'مكتمل', value: stats.completedOrders, color: '#22c55e' },
//   ];

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.phone?.includes(searchTerm);
//     const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   const menuItems = [
//     { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
//     { id: 'orders', label: 'الطلبات', icon: ShoppingBag, badge: stats.pendingOrders },
//     { id: 'customers', label: 'العملاء', icon: Users },
//     { id: 'products', label: 'المنتجات', icon: Package },
//     { id: 'settings', label: 'الإعدادات', icon: Settings },
//   ];

//   const renderPage = () => {
//     switch (activeTab) {
//       case 'overview':
//         return <OverviewPage stats={stats} salesChartData={salesChartData} statusData={statusData} orders={orders} isDark={isDark} />;
//       case 'orders':
//         return <OrdersPage orders={filteredOrders} updateOrderStatus={updateOrderStatus} searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterStatus={filterStatus} setFilterStatus={setFilterStatus} isDark={isDark} isLoading={isLoading} />;
//       case 'customers':
//         return <CustomersPage orders={orders} isDark={isDark} />;
//       case 'products':
//         return <ProductsPage orders={orders} isDark={isDark} />;
//       case 'settings':
//         return <SettingsPage isDark={isDark} setIsDark={setIsDark} onLogout={onLogout} />;
//       default:
//         return <OverviewPage stats={stats} salesChartData={salesChartData} statusData={statusData} orders={orders} isDark={isDark} />;
//     }
//   };

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`fixed top-0 right-0 h-full ${isDark ? 'bg-gray-800' : 'bg-white'} border-l ${isDark ? 'border-gray-700' : 'border-gray-200'} w-64 transform transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
//         <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
//               <span className="text-white text-xl font-bold">K</span>
//             </div>
//             <div>
//               <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>Kavoral</h2>
//               <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>لوحة التحكم</p>
//             </div>
//           </div>
//           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
//             <X size={24} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
//           </button>
//         </div>

//         <nav className="p-4 space-y-2">
//           {menuItems.map(item => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setActiveTab(item.id);
//                 setIsSidebarOpen(false);
//               }}
//               className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
//                 activeTab === item.id
//                   ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
//                   : isDark
//                     ? 'text-gray-300 hover:bg-gray-700'
//                     : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <item.icon size={20} />
//                 <span className="font-semibold">{item.label}</span>
//               </div>
//               {item.badge > 0 && (
//                 <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                   {item.badge}
//                 </span>
//               )}
//             </button>
//           ))}
//         </nav>

//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
//           <button
//             onClick={onLogout}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isDark ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
//           >
//             <LogOut size={20} />
//             <span className="font-semibold">تسجيل الخروج</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="lg:mr-64">
//         <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-30 shadow-sm`}>
//           <div className="flex items-center justify-between px-4 py-4">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <Menu size={24} className={isDark ? 'text-white' : 'text-gray-800'} />
//               </button>
//               <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
//                 {menuItems.find(item => item.id === activeTab)?.label}
//               </h1>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setIsDark(!isDark)}
//                 className={`p-2 rounded-xl ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'} hover:scale-110 transition-transform`}
//               >
//                 {isDark ? <Sun size={20} /> : <Moon size={20} />}
//               </button>
              
//               <button className={`p-2 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} hover:scale-110 transition-transform relative`}>
//                 <Bell size={20} className={isDark ? 'text-white' : 'text-gray-700'} />
//                 {stats.pendingOrders > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                     {stats.pendingOrders}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </header>

//         <main className="p-4 lg:p-6">
//           {renderPage()}
//         </main>
//       </div>
//     </div>
//   );
// };

// // ============================================
// // SUB-COMPONENTS (مختصرة للمساحة)
// // ============================================
// const OverviewPage = ({ stats, salesChartData, statusData, orders, isDark }) => (
//   <div className="space-y-6">
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       <StatCard icon={ShoppingBag} label="إجمالي الطلبات" value={stats.totalOrders} color="blue" isDark={isDark} />
//       <StatCard icon={Clock} label="طلبات اليوم" value={stats.todayOrders} color="yellow" isDark={isDark} />
//       <StatCard icon={DollarSign} label="المبيعات" value={`${stats.totalSales} ج`} color="green" isDark={isDark} />
//       <StatCard icon={CheckCircle} label="مكتمل" value={stats.completedOrders} color="purple" isDark={isDark} />
//     </div>
    
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       <div className={`lg:col-span-2 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
//         <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>المبيعات الأسبوعية</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={salesChartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={3} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
//         <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>حالة الطلبات</h3>
//         <ResponsiveContainer width="100%" height={200}>
//           <PieChart>
//             <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
//               {statusData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   </div>
// );

// const OrdersPage = ({ orders, updateOrderStatus, searchTerm, setSearchTerm, filterStatus, setFilterStatus, isDark, isLoading }) => {

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <Loader size={48} className="animate-spin text-green-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg`}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="relative">
//             <Search size={20} className="absolute right-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="بحث..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className={`w-full pr-10 pl-4 py-3 rounded-xl border-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
//             />
//           </div>
          
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className={`px-4 py-3 rounded-xl border-2 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
//           >
//             <option value="all">جميع الطلبات</option>
//             <option value="pending">قيد الانتظار</option>
//             <option value="processing">قيد التنفيذ</option>
//             <option value="completed">مكتمل</option>
//           </select>
//         </div>
//       </div>

//       <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-x-auto`}>
//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="text-right p-3 text-sm">رقم الطلب</th>
//               <th className="text-right p-3 text-sm">العميل</th>
//               <th className="text-right p-3 text-sm">الهاتف</th>
//               <th className="text-right p-3 text-sm">المبلغ</th>
//               <th className="text-right p-3 text-sm">الحالة</th>
//               <th className="text-right p-3 text-sm">إجراءات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, idx) => (
//               <tr key={idx} className="border-b hover:bg-gray-50">
//                 <td className="p-3 text-sm">{order.orderNumber}</td>
//                 <td className="p-3 text-sm">{order.customerName}</td>
//                 <td className="p-3 text-sm dir-ltr text-right">{order.phone}</td>
//                 <td className="p-3 text-sm font-bold text-green-600">{order.total} ج</td>
//                 <td className="p-3">
//                   <select
//                     value={order.status}
//                     onChange={(e) => updateOrderStatus(order.orderNumber, e.target.value)}
//                     className="px-3 py-1 rounded-lg border text-sm"
//                   >
//                     <option value="pending">قيد الانتظار</option>
//                     <option value="processing">قيد التنفيذ</option>
//                     <option value="completed">مكتمل</option>
//                   </select>
//                 </td>
//                 <td className="p-3">
//                   <button onClick={() => setSelectedOrder(order)} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
//                     <Eye size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const CustomersPage = ({ orders, isDark }) => {
//   const customers = useMemo(() => {
//     const customerMap = {};
//     orders.forEach(order => {
//       if (!customerMap[order.phone]) {
//         customerMap[order.phone] = {
//           name: order.customerName,
//           phone: order.phone,
//           orders: [],
//           totalSpent: 0
//         };
//       }
//       customerMap[order.phone].orders.push(order);
//       customerMap[order.phone].totalSpent += order.total;
//     });
//     return Object.values(customerMap);
//   }, [orders]);

//   return (
//     <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
//       <h3 className="text-lg font-bold mb-4">العملاء ({customers.length})</h3>
//       <div className="space-y-3">
//         {customers.map((customer, idx) => (
//           <div key={idx} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
//             <div>
//               <p className="font-bold">{customer.name}</p>
//               <p className="text-sm text-gray-600">{customer.phone}</p>
//             </div>
//             <div className="text-left">
//               <p className="font-bold text-green-600">{customer.totalSpent} ج</p>
//               <p className="text-sm text-gray-600">{customer.orders.length} طلبات</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const ProductsPage = ({ orders, isDark }) => {
//   const products = useMemo(() => {
//     const productMap = {};
//     orders.forEach(order => {
//       order.items?.forEach(item => {
//         if (!productMap[item.name]) {
//           productMap[item.name] = { name: item.name, totalSold: 0, totalRevenue: 0 };
//         }
//         productMap[item.name].totalSold += item.quantity;
//         productMap[item.name].totalRevenue += item.price * item.quantity;
//       });
//     });
//     return Object.values(productMap);
//   }, [orders]);

//   return (
//     <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
//       <h3 className="text-lg font-bold mb-4">المنتجات</h3>
//       <div className="space-y-3">
//         {products.map((product, idx) => (
//           <div key={idx} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
//             <div>
//               <p className="font-bold">{product.name}</p>
//               <p className="text-sm text-gray-600">{product.totalSold} وحدة</p>
//             </div>
//             <p className="text-xl font-bold text-green-600">{product.totalRevenue} ج</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const SettingsPage = ({ isDark, setIsDark, onLogout }) => (
//   <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg space-y-4`}>
//     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//       <div className="flex items-center gap-3">
//         {isDark ? <Moon size={20} /> : <Sun size={20} />}
//         <span className="font-semibold">الوضع الداكن</span>
//       </div>
//       <button
//         onClick={() => setIsDark(!isDark)}
//         className={`w-14 h-8 rounded-full ${isDark ? 'bg-green-500' : 'bg-gray-300'}`}
//       >
//         <div className={`w-6 h-6 bg-white rounded-full transform transition-transform ${isDark ? 'translate-x-7' : 'translate-x-1'}`}></div>
//       </button>
//     </div>
    
//     <button
//       onClick={onLogout}
//       className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 flex items-center justify-center gap-2"
//     >
//       <LogOut size={20} />
//       تسجيل الخروج
//     </button>
//   </div>
// );

// const StatCard = ({ icon: Icon, label, value, color, isDark }) => {
//   const colors = {
//     blue: 'bg-blue-100 text-blue-600',
//     yellow: 'bg-yellow-100 text-yellow-600',
//     green: 'bg-green-100 text-green-600',
//     purple: 'bg-purple-100 text-purple-600',
//   };

//   return (
//     <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//       <div className="flex items-center justify-between mb-4">
//         <div className={`w-12 h-12 ${colors[color]} rounded-xl flex items-center justify-center`}>
//           <Icon size={24} />
//         </div>
//       </div>
//       <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
//       <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</p>
//     </div>
//   );
// };

// // ============================================
// // MAIN APP COMPONENT
// // ============================================
// const DashboardApp = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isDark, setIsDark] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const auth = await window.storage?.get('kavoral_admin_auth');
//         if (auth?.value === 'true') {
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         const localAuth = localStorage.getItem('kavoral_admin_auth');
//         if (localAuth === 'true') {
//           setIsAuthenticated(true);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const handleLogin = (success) => {
//     setIsAuthenticated(success);
//   };

//   const handleLogout = async () => {
//     try {
//       await window.storage?.delete('kavoral_admin_auth');
//     } catch (error) {
//       localStorage.removeItem('kavoral_admin_auth');
//     }
//     setIsAuthenticated(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader size={48} className="animate-spin text-green-500 mx-auto mb-4" />
//           <p className="text-gray-400">جاري التحميل...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <LoginPage onLogin={handleLogin} isDark={isDark} setIsDark={setIsDark} />;
//   }

//   return <Dashboard onLogout={handleLogout} isDark={isDark} setIsDark={setIsDark} />;
// };

// export default DashboardApp;