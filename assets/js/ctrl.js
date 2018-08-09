goSua.controller('MainCtrl', function( $rootScope, $scope, $http, $window, $document, $filter, 
	$timeout, MFirebaseService,toastr, toastrConfig, $interval ) {

	var configToastr = function() {
        toastrConfig.closeButton = false;
        toastrConfig.timeOut = 3000;
        toastrConfig.toastClass = 'notice';
        toastrConfig.containerId = 'global-notices';
        toastrConfig.iconClasses = {
            error: 'is-error',
            info: 'is-info',
            success: 'is-success',
            warning: 'is-warning'
          };
        // toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.positionClass = "toast-bottom-right";
    }

    configToastr();

    function AlertError(c, d) {
        toastr.error(c, d)
    };

    function AlertSuccessful(c, d) {
        toastr.success(c, d)
    };

    // AlertSuccessful( 'Đức Thành vừa đặt hàng thành công, Số ĐT 0912.525...', 'Thông báo' );

    function random_item(items){
		return items[Math.floor(Math.random()*items.length)];
	}

	function makeMessage(){
		return random_item( names ) + ' vừa đặt hàng thành công. Số điện thoại ' + random_item( mobiles );
	}

	var names = [ 'Đức Thành', 
	'Hoàng Nghĩa', 'Trọng Đức', 'Khánh BDS', 
	'Lâm Sung', 'Hoàng Sơn', 'Đình Hà',
	'Phan Trọng Lưu',
	'Nguyễn Đức Huấn',
	'Đặng Văn Thành',
	'Trương Việt Hùng',
	'Đỗ Văn Quân',
	'Nguyễn Hải',
	'Đức Cường',
	'Hà Minh',
	'Tonny Hùng',
	'Uyên Phạm',
	'Nguyễn Thị Định',
	'An Pham',
	'Chien Xuan',
	'Trinh Nguyen',
	'Que Pink',
	'Nguyen Tho',
	'Ngocanh Bống',
	'Đông Nguyên Thi',
	'Đại Sự',
	'Dinh Anh Nguyet',
	'Thuy Binh',
	'Uyen Nguyen',
	'Quan Hue',
	'Võ Thị Như Hoa',
	'Hải Đăng',
	'Kim Thao',
	'Cúc Hồng',
	'Mai Thị Hồi',
	'Tuấn Còiss',
	'Trong Nghia Hoang',
	'Thành Lê',
	'Nguyễn Phan Gia Huy',
	'Toàn Minh',
	'Đèn Nam Hồng',
	'Tung Lam',
	'Dân Shipper',
	'Nhan Ho',
	'Dat Le',
	'Trương Hữu Đức',
	'Thọ Dung',
	'Vu Đại',
	'Thuan Dinh Vu',
	'Vy Hiếu',
	'Bầu Trờj Khôg Tên',
	'LeAnh Ky',
	'Bob Dylan' ];
	var mobiles = [ '091285....', '0168255.....', '0986154...', '0978155...', 
	'0978414...', '09130252...', '0168225...', '0977121...', '0982125...' ];
	var timers = [ 8000, 15000, 3500, 10000, 16000, 1450 ];
	

	// setInterval(AlertSuccessful( makeMessage(), 'Thông báo' ),1000);

	$interval(function(){
	  AlertSuccessful( makeMessage(), 'Thông báo' );
	}, 10000)

	// alert('working');
	$scope.old_price = 1290000;
	$scope.price = 790000;

	$scope.welcome_message = "Chào mừng bạn đến với Phong thủy Tại Tâm";

	// console.log( MFirebaseService );

	$scope.feedbacks = [
		{
			name: 'TRƯƠNG ĐÌNH MÃO',
			content: 'Mình đeo vòng được gần 1 tuần rồi, phải nói là quá linh nghiệm, rất may mắn nữa. Nhờ sự giúp đỡ của mọi người mà mẹ mình đã mổ thành công rồi, mọi sự đều thuận lợi. Đúng là vạn sự tùy duyên mới gặp Shop. Mình xin cảm ơn nhiều! Chúc shop ngày càng đông khách!',
			address: 'Lục Ngạn - Bắc Giang',
			id: 667561183394063
		},
		{
			name: 'ĐẶNG TRƯỜNG GIANG',
			content: 'Mua hàng của shop đã lâu giờ mới viết đánh giá. Mình rất hài lòng khi mua hàng ở shop. Vòng rất đẹp, vân đẹp lắm và mùi gỗ rất thơm. Gói hàng cẩn thận, giao hàng rất nhanh. Rất thích cách làm việc của shop! Mua 1 lần là muốn mua thêm nhiều lần nữa!',
			address: 'Phương Mai - Hà Nội',
			id: 1772016989732091
		},
		{
			name: 'LƯƠNG NGỌC BÌNH',
			content: 'Mình rất ít khi mua hàng trên mạng vì nó không đáng tin, nhưng khi mình đặt mua ở đây thì thay đổi quan điểm hẳn. Giá cả vô cùng phải chăng, vận chuyển nhanh chóng... Mình rất là hài lòng khi mua!!! ',
			address: 'Trảng Bom - Đồng Nai',
			id: 771350329671297,
		},
		
	];

	$scope.customers = Math.floor( ((new Date().getTime())) / 1000 ) - 1533340000;
	$scope.today_customers = /*Math.floor( ((new Date().getTime())) / 1000 ) - 1533543000*/1028;

	$scope.orderData = {
		name: '',
		mobile: '',
		created_at: Date.now(),
	}

	$scope.submitOrder = function(){
		if( 
		 !$scope.orderData.mobile ||
		  
		   $scope.orderData.mobile.length == 0) {
			return;
		}

		validatePhoneNumber(false, 'Số điện thoại', 
            $scope.orderData.mobile).then(function(response){
				if( !$scope.orderData.name ||  $scope.orderData.name.length == 0 ) {
					$scope.orderData.name = 'Khách lẻ';
				}
				$scope.isSubmitting = true;
			
				MFirebaseService.addOrder( $scope.orderData ).then( function( response ){
					$scope.$apply(function(){
						$scope.isSubmitting = false;
					})
					// alert('Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ bạn trong giây lát!');
					AlertSuccessful( 'Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ bạn trong giây lát!', 'Thông báo' );
					$scope.orderData = {
						name: '',
						mobile: '',
					}
				})
            })  
            .catch(function(err){
                AlertError(err, 'Lỗi');
                return;
        })

		
	}

	function validatePhoneNumber(m = false, w, l, q, y, j) {
        q = p_validPhone;
        y = p_validHomePhone;

        console.log(l);
        // console.log(j);

        return new Promise(function(resolve, reject){
            if(l.length == 0){
                reject(w + ' bắt buộc');
            }
            var p, d, v, k, g;
            if (m && IsNullOrEmpty(l)) {
                reject(w + ' bắt buộc');
            }
            if (!IsNullOrEmpty(l)) {
                if (l.indexOf("1800") === 0 || l.indexOf("1900") === 0) {
                    reject('Đây là đầu số 1800, 1900');
                }
                if (l[0] == "0" && (l = l.substr(1, l.length)), p = q.split(","), d = 0, p != null && p != undefined && p.length > 0) {
                    for (g = 0; g < p.length; g++) {
                        if (l.indexOf(p[g]) === 0) {
                            d = p[g];
                            break
                        }
                    }
                    if (g < p.length && !isNaN(l)) {
                        var result = d == "868" && l.length != 9 ? "Số điện thoại phải là 10 số" : d != "868" && d.length == 2 && l.length != 9 ? "Số điện thoại phải là 10 số" : d != "868" 
                        && d.length == 3 && l.length != 10 ? "Số điện thoại phải là 11 số" : ''

                        if(result !== ''){
                            reject(result);
                        }
                        else{
                            resolve('Số điện thoại hợp lệ');
                        }
                    }
                    if (j) {
                        reject("Số điện thoại di động không hợp lệ");
                    }
                }
                if (v = y.split(","), k = 0, v != null && v != undefined && v.length > 0) {
                    for (g = 0; g < v.length; g++) {
                        if (l.indexOf(v[g]) === 0) {
                            k = v[g];
                            break
                        }
                    }
                    if (g < v.length && !isNaN(l)) {
                        if ((k == "4" || k == "8") && l.length != 9) {
                            reject("Số điện thoại bàn phải là 10 số");
                        }
                        if (k != "4" && k != "8" && l.length - k.length != 7) {
                            reject("Số điện thoại bàn phải là " + (k.length + 8) + " số");
                        }
                    } else {
                        reject("Số điện thoại không hợp lệ");
                    }
                }
            }
            resolve('Số điện thoại hợp lệ');
        })
    };

    function IsNullOrEmpty(c) {
        return !c || !/[^\s]+/.test(c)
    };

    var p_validPhone = "86,88,89,90,91,92,93,94,96,97,98,99,120,121,122,123,124,125,126,127,128,129,161,162,163,164,165,166,167,168,169,186,188,199,868";
    var p_validHomePhone = "4,8,55,56,57,58,59,60,61,62,63,64,66,67,68,70,72,73,75,203,204,205,206,207,208,209,212,213,214,215,216,220,221,222,225,226,227,228,229,232,233,234,235,236,237,238,239,251,252,254,255,256,257,258,259,260,261,262,263,269,270,271,272,273,274,275,276,277,290,291,292,293,294,296,297,299,500,501,650,651,241,242,243,244,245,246,247,248,249,281,282,283,284,285,286,287,288,289";


})