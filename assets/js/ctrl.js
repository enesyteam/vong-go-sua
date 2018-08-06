goSua.controller('MainCtrl', function( $rootScope, $scope, $http, $window, $document, $filter, 
	$timeout, MFirebaseService ) {
	// alert('working');
	$scope.old_price = 1090000;
	$scope.price = 790000;

	console.log( MFirebaseService );

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

	$scope.customers = Math.floor( ((new Date().getTime())) / 10000000 );

	$scope.orderData = {
		name: '',
		mobile: '',
	}

	$scope.submitOrder = function(){
		if( 
		 !$scope.orderData.mobile ||
		  
		   $scope.orderData.mobile.length == 0) {
			return;
		}

		if( !$scope.orderData.name ||  $scope.orderData.name.length == 0 ) {
			$scope.orderData.name = 'Khách lẻ';
		}
		$scope.isSubmitting = true;
	
		MFirebaseService.addOrder( $scope.orderData ).then( function( response ){
			$scope.$apply(function(){
				$scope.isSubmitting = false;
			})
			alert('Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ bạn trong giây lát!');
			$scope.orderData = {
				name: '',
				mobile: '',
			}
		})
	}
})