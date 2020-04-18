window.MyValues = {
    Color : {
        Silver: '#ebe6e3',
        Gold: '#b89543',
        Black: '#0e0e0e',
        Blue: '#384b76',
        Gray: '#727272',
        Green: '#0aa047',
        Lime: '#96ba3b',
        Orange: '#df7625',
        Pink: '#fe37f8',
        Purple: '#7d00f9',
        Red: '#c01f27',
        UltraBlue: '#36f0fe',
        White: '#fdfdfd',
        Yellow: '#fef200'
    }
    ,Side : {
        LeftView: 'out_side_left',
        RightView: 'out_side_right',
        PairView:'pairview'
    },
    Material: {
        glossy: 'glossy',
        carbon: 'carbon',
        metallic: 'metallic',
        matte: 'matte'
    }
}
window.ColorName = {
    Silver: 'Silver',
    Gold:   'Gold',
    Gray:   'Gray',
    Black:  'Black',
    Blue:   'Blue',
    Green:  'Green',
    Lime:   'Lime',
    Orange: 'Orange',
    Pink:   'Pink',
    Purple: 'Purple',
    Red:    'Red',
    UltraBlue: 'UltraBlue',
    White:  'White',
    Yellow: 'Yellow'
}
window.ColorCollection = {
    metallic: {
        ColorName: [
            "Silver", "Gold"
        ],
        Values: [
            window.MyValues.Color.Silver,//silver
            window.MyValues.Color.Gold
        ]
    },
    carbon: {
        ColorName: ["Black", "Blue", "Green", "Lime", "Orange", "Pink", "Purple", "Red", "UltraBlue", "White", "Yellow"],
        Values: [
            window.MyValues.Color.Black,//silver
            window.MyValues.Color.Blue,
            window.MyValues.Color.Green,
            window.MyValues.Color.Lime,
            window.MyValues.Color.Orange,
            window.MyValues.Color.Pink,
            window.MyValues.Color.Purple,
            window.MyValues.Color.Red,
            window.MyValues.Color.UltraBlue,
            window.MyValues.Color.White,
            window.MyValues.Color.Yellow
        ]
    }
    ,matte: {
        ColorName: ["Black", "Blue", "Gray", "Green", "Lime", "Orange", "Pink", "Purple", "Red", "UltraBlue", "White", "Yellow"],
        Values:
        [
            window.MyValues.Color.Black,
            window.MyValues.Color.Blue,
            window.MyValues.Color.Gray,
            window.MyValues.Color.Green,
            window.MyValues.Color.Lime,
            window.MyValues.Color.Orange,
            window.MyValues.Color.Pink,
            window.MyValues.Color.Purple,
            window.MyValues.Color.Red,
            window.MyValues.Color.UltraBlue,
            window.MyValues.Color.White,
            window.MyValues.Color.Yellow
        ]
    },
    glossy: {
        ColorName: ["Black", "Blue", "Lime", "Orange", "Pink", "Red", "UltraBlue", "White", "Yellow"],
        Values: [
            window.MyValues.Color.Black,
            window.MyValues.Color.Blue,
            window.MyValues.Color.Lime,
            window.MyValues.Color.Orange,
            window.MyValues.Color.Pink,
            window.MyValues.Color.Red,
            window.MyValues.Color.UltraBlue,
            window.MyValues.Color.White,
            window.MyValues.Color.Yellow
        ]
    }
}

var myApp = function () {
    window.imgRender = [];
    this.initIndexPage = function () {
        $("#cbxModelInline").kendoDropDownList({
            dataTextField: "Name",
            dataValueField: "Id",
            optionLabel: "INLINE",
            valueTemplate: '<span>#=data.name #</span>',
            template: '<div class="dropdown-img-wrapper"><img class="dropdown_img" src="' + imgRoot+'" /></div><span>#=data.name #</span>',
            change: function (e) {
                window.location.href = "/Home/CustomizeNotFound?model=" + value;
                
            },
            dataSource: {
                data: [
                    { Id: 'inline', name: 'OPTION', class: 'c_st_1' }
                ]
            }
        });

        $("#cbxModelShort").kendoDropDownList({
            dataTextField: "Name",
            dataValueField: "Id",
            optionLabel: "SHORT",
            valueTemplate: '<span>#=data.name #</span>',
            template: '<div class="dropdown-img-wrapper"><img class="dropdown_img" src="' + imgRoot+'" /></div><span>#=data.name #</span>',
            change: function (e) {
                var value = this.value();
                window.location.href = "/Home/Customize?model=" + value +"&material=metallic";
            },
            dataSource: {
                data: [
                    { Id: 'short', name: 'OPTION', class: 'c_st_1' }
                ]
            }
        });
       
        $("#cbxModelLong").kendoDropDownList({
            dataTextField: "Name",
            dataValueField: "Id",
            optionLabel: "LONG",
            valueTemplate: '<span>#=data.name #</span>',
            template: '<div class="dropdown-img-wrapper"><img class="dropdown_img" src="' + imgRoot+'" /></div><span>#=data.name #</span>',
            change: function (e) {
                var value = this.value();
                window.location.href = "/Home/CustomizeNotFound?model=" + value;
            },
            dataSource: {
                data: [
                    { Id: 'long', name: 'OPTION', class: 'c_st_1' }

                ]
            },
            //height: 500
        });
    }
    this.LoadResource = function(callback) {
        var total_images = $("#image-warraper img").length;
        var images_loaded = 0;
        $("#image-warraper").find('img').each(function () {
            
            var fakeSrc = $(this).attr('src');
            $("<img/>").attr("src", fakeSrc).css('display', 'none').load(function (e) {
                images_loaded++;
                var percent = parseInt((images_loaded / total_images) * 100);
                //$('#progressBar').css("width", percent + '%');
                if (images_loaded >= total_images) {
                    // now all images are loaded.
                    console.log("all images are loaded. Click OK to view.");
                    
                    setTimeout(function () {
                        callback();
                        $("#progress").fadeOut(1000);
                        $("#wrapper").fadeIn(100);
                        $('#image-warraper').data("loaded","1");
                    }, 1000);
                }
            }).error(function () {
                images_loaded--;
            });
        });
        var resourceLoop = setInterval(function() {
            if ($('#image-warraper').data("loaded") != "1") {
                console.log("all images are not loaded. retry to view.");
                $("#progress").fadeOut(500);
                $('#controls').hide();
                $("#wrapper").html("<p><h3>Resource can not load<br>Please check your network then try refresh page or contact with cityRun!</h3></p>");
                $('#wrapper').css({ 'textAlign':'center', 'paddingTop': '135px' });
                $("#wrapper").fadeIn(500);
            } else {
                clearInterval(resourceLoop);
            }
        },3000);

    }
    this.Init = function (model, material) {
        var canvas = this.canvas = new fabric.Canvas('canvas', {
            hoverCursor: 'pointer',
            height:500,
            width:1000,
            selection: false,
            targetFindTolerance: 2,
            renderOnAddRemove: true
        });
        var canvasRight = this.canvasRight = new fabric.Canvas('canvasRight', {
            hoverCursor: 'pointer',
            selection: false,
            height:500,
            width:1000,
            targetFindTolerance: 2,
            renderOnAddRemove: true
        });
        var canvasPair = this.canvasPair = new fabric.Canvas('canvasPair', {
            hoverCursor: 'pointer',
            selection: false,
            width:1300,
            height:760,
            targetFindTolerance: 2,
            renderOnAddRemove: true
        });

        var fImgblackLine = new fabric.Image($('#imgblackLine')[0]);
        fImgblackLine.lockMovementX = true;
        fImgblackLine.lockMovementY = true;
        fImgblackLine.perPixelTargetFind = false;
        fImgblackLine.selectable = false;
        fImgblackLine.evented = false;
        fImgblackLine.scale(0.96);
        window.imgRender["imgblackLine"] = fImgblackLine;

        var fImgblackRLine = new fabric.Image($('#imgblackLine')[0]);
        fImgblackRLine.lockMovementX = false;
        fImgblackRLine.lockMovementY = false;
        fImgblackRLine.perPixelTargetFind = true;
        fImgblackRLine.selectable = true;
        fImgblackRLine.evented = false;
        fImgblackRLine.flipX = true;
     
        fImgblackRLine.set({ left: 47, top: 81, scaleX: 0.958, scaleY: 0.9608945578231292 });

        window.imgRender["imgblackRLine"] = fImgblackRLine;

        var imgWhiteLine = new fabric.Image($('#imgWhiteLine')[0]);
        imgWhiteLine.lockMovementX = false;
        imgWhiteLine.lockMovementY = false;
        imgWhiteLine.perPixelTargetFind = true;
        imgWhiteLine.selectable = true;
        imgWhiteLine.evented = false;
        imgWhiteLine.scale(0.96);
        window.imgRender["imgWhiteLine"] = imgWhiteLine;

        var fImgWhiteRLine = new fabric.Image($('#imgWhiteLine')[0]);
        fImgWhiteRLine.lockMovementX = false;
        fImgWhiteRLine.lockMovementY = false;
        fImgWhiteRLine.perPixelTargetFind = true;
        fImgWhiteRLine.selectable = true;
        fImgWhiteRLine.evented = false;
        fImgWhiteRLine.flipX = true;
     
        fImgWhiteRLine.set({ left: 47, top: 81, scaleX: 0.958, scaleY: 0.9608945578231292 });

        window.imgRender["imgWhiteRLine"] = fImgWhiteRLine;
        $.each($('.cvimg.metallic'), function (i, img) {

            var id = img.id;
            var part = $(img).data('part');
            var fImg = new fabric.Image(img);
            fImg.perPixelTargetFind = true;
            fImg.evented = true;
            if (part == "ViewSide") {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.perPixelTargetFind = false;
                fImg.evented = false;
                fImg.scale(0.95);
            }
            else if (part == "Tongue11") {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.scale(0.965);
            }
            else {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.scale(0.96);
            }

            
            fImg.hasControls = false;
            fImg.hasBorders = false;
            window.imgRender[id] = fImg;
        });
        $.each($('.cvimg.matte'), function (i, img) {

            var id = img.id;
            var part = $(img).data('part');
            var fImg = new fabric.Image(img);
            fImg.perPixelTargetFind = true;
            fImg.evented = true;
            if (part == "ViewSide") {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.perPixelTargetFind = false;
                fImg.evented = false;
                fImg.scale(0.95);
            }
            else if (part == "Tongue11") {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.scale(0.965);
            }
            else {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.scale(0.96);
            }


            fImg.hasControls = false;
            fImg.hasBorders = false;
            window.imgRender[id] = fImg;
        });
        $.each($('.cvimg.carbon'), function (i, img) {

            var id = img.id;
            var part = $(img).data('part');
            var fImg = new fabric.Image(img);
            fImg.perPixelTargetFind = true;
            fImg.evented = true;
            if (part == "ViewSide") {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.perPixelTargetFind = false;
                fImg.evented = false;
                fImg.scale(0.95);
            }
            else if (part == "Tongue11") {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.scale(0.965);
            }
            else {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.scale(0.96);
            }


            fImg.hasControls = false;
            fImg.hasBorders = false;
            window.imgRender[id] = fImg;
        });
        $.each($('.cvimg.glossy'), function (i, img) {

            var id = img.id;
            var part = $(img).data('part');
            var fImg = new fabric.Image(img);
            fImg.perPixelTargetFind = true;
            fImg.evented = true;
            if (part == "ViewSide") {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.perPixelTargetFind = false;
                fImg.evented = false;
                fImg.scale(0.95);
            }
            else if (part == "Tongue11") {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.scale(0.965);
            }
            else {
                fImg.lockMovementX = true;
                fImg.lockMovementY = true;
                fImg.selectable = false;
                fImg.scale(0.96);
            }


            fImg.hasControls = false;
            fImg.hasBorders = false;
            window.imgRender[id] = fImg;
        });
        //$.each($('.cvimg.pairview'), function (i, img) {

        //    var id = img.id;
        //    var part = $(img).data('part');
        //    var fImg = new fabric.Image(img);
        //    if (part == "PairView") {
        //        fImg.lockMovementX = true;
        //        fImg.lockMovementY = true;
        //        fImg.selectable = false;
        //        fImg.scale(0.95);
        //    }
        //    else {
        //        fImg.lockMovementX = false;
        //        fImg.lockMovementY = false;
        //        fImg.selectable = true;
        //        fImg.scale(0.96);
        //    }

        //    fImg.perPixelTargetFind = true;
        //    fImg.evented = true;
        //    fImg.hasControls = true;
        //    fImg.hasBorders = true;

        //    window.imgRender[id] = fImg;
        //});
        var left = 0;
        var top = 0;
        //#region line
        window.imgRender["imgblackLine"].set({ left: left + 109, top: top + 78 });
        window.imgRender["imgWhiteLine"].set({ left: left + 109, top: top + 78 });
        var that = (this);
        if (material == window.MyValues.Material.metallic) {
            window.imgRender["out_side_left_metallic_Silver_0"].set({ left: left, top: top - 13 });
            window.imgRender["out_side_left_metallic_Silver_1"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Silver_2"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Silver_3"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Silver_4"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Silver_5"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Silver_6"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Silver_7"].set({ left: left + 245, top: top + 188 });
            window.imgRender["out_side_left_metallic_Silver_8"].set({ left: left + 380, top: top + 178 });
            window.imgRender["out_side_left_metallic_Silver_9"].set({ left: left + 526, top: top + 184 });
            window.imgRender["out_side_left_metallic_Silver_10"].set({ left: left + 815, top: top + 217 });
            window.imgRender["out_side_left_metallic_Silver_11"].set({ left: left + 20, top: top });

            window.imgRender["out_side_left_metallic_Gold_0"].set({ left: left, top: top - 13 });
            window.imgRender["out_side_left_metallic_Gold_1"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Gold_2"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Gold_3"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Gold_4"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Gold_5"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Gold_6"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_metallic_Gold_7"].set({ left: left + 245, top: top + 188 });
            window.imgRender["out_side_left_metallic_Gold_8"].set({ left: left + 380, top: top + 178 });
            window.imgRender["out_side_left_metallic_Gold_9"].set({ left: left + 526, top: top + 184 });
            window.imgRender["out_side_left_metallic_Gold_10"].set({ left: left + 815, top: top + 217 });
            window.imgRender["out_side_left_metallic_Gold_11"].set({ left: left + 20, top: top });

            //#region right

            //#region gold
            window.imgRender["out_side_right_metallic_Gold_0"].set({ left: left - 22, top: top - 13 });
            window.imgRender["out_side_right_metallic_Gold_1"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_metallic_Gold_2"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_metallic_Gold_3"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_metallic_Gold_4"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_metallic_Gold_5"].set({ left: left + 29, top: top });
            window.imgRender["out_side_right_metallic_Gold_6"].set({ left: left + 28, top: top + 3 });
            window.imgRender["out_side_right_metallic_Gold_7"].set({ left: left + 606, top: top + 185 });
            window.imgRender["out_side_right_metallic_Gold_8"].set({ left: left + 518, top: top + 168 });
            window.imgRender["out_side_right_metallic_Gold_9"].set({ left: left + 246, top: top + 192 });
            window.imgRender["out_side_right_metallic_Gold_10"].set({ left: left + 53, top: top + 214 });
            window.imgRender["out_side_right_metallic_Gold_11"].set({ left: left + 26, top: top + 3.333 });
            //#endregion gold

            //#region silver
            window.imgRender["out_side_right_metallic_Silver_0"].set({ left: left - 22, top: top - 13 });
            window.imgRender["out_side_right_metallic_Silver_1"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_metallic_Silver_2"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_metallic_Silver_3"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_metallic_Silver_4"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_metallic_Silver_5"].set({ left: left + 29, top: top });
            window.imgRender["out_side_right_metallic_Silver_6"].set({ left: left + 28, top: top + 3 });
            window.imgRender["out_side_right_metallic_Silver_7"].set({ left: left + 606, top: top + 185 });
            window.imgRender["out_side_right_metallic_Silver_8"].set({ left: left + 518, top: top + 168 });
            window.imgRender["out_side_right_metallic_Silver_9"].set({ left: left + 246, top: top + 192 });
            window.imgRender["out_side_right_metallic_Silver_10"].set({ left: left + 53, top: top + 214 });
            window.imgRender["out_side_right_metallic_Silver_11"].set({ left: left + 26, top: top + 3.333 });
            //#endregion silver
            //#endregion right
            //#region pair
            //#region gold

            //window.imgRender["pairview_metallic_Gold_0"].set({ left: left, top: pairViewTopBase - 9 });//0
            //window.imgRender["pairview_metallic_Gold_1_l"].set({ left: left + 105, top: pairViewTopBase + 95.75 });//1
            //window.imgRender["pairview_metallic_Gold_1_r"].set({ left: left + 100, top: pairViewTopBase + 95.75 });//2
            //window.imgRender["pairview_metallic_Gold_2_l"].set({ left: left + 105, top: pairViewTopBase + 92 });//3
            //window.imgRender["pairview_metallic_Gold_2_r"].set({ left: left + 100, top: pairViewTopBase + 92 });//4
            //window.imgRender["pairview_metallic_Gold_3_l"].set({ left: left + 105, top: pairViewTopBase + 96 });//5
            //window.imgRender["pairview_metallic_Gold_3_r"].set({ left: left + 100, top: pairViewTopBase + 96 });//6
            //window.imgRender["pairview_metallic_Gold_4_l"].set({ left: left + 105, top: pairViewTopBase + 95.5 });//7
            //window.imgRender["pairview_metallic_Gold_4_r"].set({ left: left + 100, top: pairViewTopBase + 95.5 });//8
            //window.imgRender["pairview_metallic_Gold_5_l"].set({ left: left + 112.5, top: pairViewTopBase + 98.5, scaleX: 0.95, scaleY: 0.95 });//9
            //window.imgRender["pairview_metallic_Gold_5_r"].set({ left: left + 105, top: pairViewTopBase + 98.5, scaleX: 0.95, scaleY: 0.95 });//10
            //window.imgRender["pairview_metallic_Gold_6_l"].set({ left: left + 105, top: pairViewTopBase + 96.25, scaleX: 0.9609, scaleY: 0.9609 });//11
            //window.imgRender["pairview_metallic_Gold_6_r"].set({ left: left + 100, top: pairViewTopBase + 96.25, scaleX: 0.9609, scaleY: 0.9609 });//12
            //window.imgRender["pairview_metallic_Gold_7_l"].set({ left: left + 605, top: pairViewTopBase + 336, scaleX: 0.95, scaleY: 0.95 });//13
            //window.imgRender["pairview_metallic_Gold_7_r"].set({ left: left + 355, top: pairViewTopBase + 336, scaleX: 0.95, scaleY: 0.95 });//14
            //window.imgRender["pairview_metallic_Gold_8_l"].set({ left: left + 632, top: pairViewTopBase + 275, scaleX: 0.9609, scaleY: 0.9609 });//15
            //window.imgRender["pairview_metallic_Gold_8_r"].set({ left: left + 335.25, top: pairViewTopBase + 275, scaleX: 0.95, scaleY: 0.95 });//16
            //window.imgRender["pairview_metallic_Gold_9_l"].set({ left: left + 739, top: pairViewTopBase + 160, scaleX: 0.95, scaleY: 0.95 });//17
            //window.imgRender["pairview_metallic_Gold_9_r"].set({ left: left + 316, top: pairViewTopBase + 160, scaleX: 0.95, scaleY: 0.95 });//18
            //window.imgRender["pairview_metallic_Gold_11_l"].set({ left: left + 90, top: pairViewTopBase + 97, scaleX: 0.99, scaleY: 0.99 });//19
            //window.imgRender["pairview_metallic_Gold_11_r"].set({ left: left + 93.5, top: pairViewTopBase + 97, scaleX: 0.98, scaleY: 0.98 });//20
            ////#endregion gold
            ////#region silver
            //window.imgRender["pairview_metallic_Silver_0"].set({ left: left, top: pairViewTopBase - 8.5 });
            //window.imgRender["pairview_metallic_Silver_1_l"].set({ left: left + 105, top: pairViewTopBase + 95.75 });
            //window.imgRender["pairview_metallic_Silver_1_r"].set({ left: left + 100, top: pairViewTopBase + 95.75 });
            //window.imgRender["pairview_metallic_Silver_2_l"].set({ left: left + 105, top: pairViewTopBase + 92 });
            //window.imgRender["pairview_metallic_Silver_2_r"].set({ left: left + 100, top: pairViewTopBase + 92 });
            //window.imgRender["pairview_metallic_Silver_3_l"].set({ left: left + 105, top: pairViewTopBase + 96 });
            //window.imgRender["pairview_metallic_Silver_3_r"].set({ left: left + 100, top: pairViewTopBase + 96 });
            //window.imgRender["pairview_metallic_Silver_4_l"].set({ left: left + 105, top: pairViewTopBase + 99.25 });
            //window.imgRender["pairview_metallic_Silver_4_r"].set({ left: left + 100, top: pairViewTopBase + 99.25 });
            //window.imgRender["pairview_metallic_Silver_5_l"].set({ left: left + 112.5, top: pairViewTopBase + 98.5, scaleX: 0.95, scaleY: 0.95 });
            //window.imgRender["pairview_metallic_Silver_5_r"].set({ left: left + 105, top: pairViewTopBase + 98.5, scaleX: 0.95, scaleY: 0.95 });
            //window.imgRender["pairview_metallic_Silver_6_l"].set({ left: left + 105, top: pairViewTopBase + 96.25, scaleX: 0.9609, scaleY: 0.9609 });
            //window.imgRender["pairview_metallic_Silver_6_r"].set({ left: left + 100, top: pairViewTopBase + 96.25, scaleX: 0.9609, scaleY: 0.9609 });
            //window.imgRender["pairview_metallic_Silver_7_l"].set({ left: left + 605, top: pairViewTopBase + 336, scaleX: 0.95, scaleY: 0.95 });
            //window.imgRender["pairview_metallic_Silver_7_r"].set({ left: left + 355, top: pairViewTopBase + 336, scaleX: 0.95, scaleY: 0.95 });
            //window.imgRender["pairview_metallic_Silver_8_l"].set({ left: left + 632, top: pairViewTopBase + 268, scaleX: 0.9609, scaleY: 0.9609 });
            //window.imgRender["pairview_metallic_Silver_8_r"].set({ left: left + 336.25, top: pairViewTopBase + 275, scaleX: 0.95, scaleY: 0.95 });
            //window.imgRender["pairview_metallic_Silver_9_l"].set({ left: left + 739, top: pairViewTopBase + 160, scaleX: 0.95, scaleY: 0.95 });
            //window.imgRender["pairview_metallic_Silver_9_r"].set({ left: left + 316, top: pairViewTopBase + 160, scaleX: 0.95, scaleY: 0.95 });
            //window.imgRender["pairview_metallic_Silver_11_l"].set({ left: left + 90, top: pairViewTopBase + 97, scaleX: 0.99, scaleY: 0.99 });
            //window.imgRender["pairview_metallic_Silver_11_r"].set({ left: left + 93.5, top: pairViewTopBase + 97, scaleX: 0.99, scaleY: 0.99 });
            //#endregion silver

            //#endregion pair

            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_0"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_1"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_2"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_3"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_4"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_5"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_6"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_7"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_8"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_9"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_10"]);
            this.canvas.add(window.imgRender["out_side_left_metallic_Silver_11"]);
            this.canvas.add(window.imgRender["imgblackLine"]);
            this.canvas.setZoom(0.9);
            this.canvas.absolutePan(new fabric.Point(-130, 0));

            //right 

            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_0"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_1"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_2"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_3"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_4"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_5"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_6"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_7"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_8"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_9"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_10"]);
            this.canvasRight.add(window.imgRender["out_side_right_metallic_Silver_11"]);
            
            this.canvas.add(window.imgRender["imgblackLine"]);
            this.canvasRight.add(window.imgRender["imgblackRLine"]);
        }
       
        else if (material == window.MyValues.Material.matte) 
        {

            window.ColorCollection.matte.ColorName.forEach(function(e, i) {
            window.imgRender["out_side_left_" + material +"_" + e+"_0"].set({ left: left, top: top - 13 });
            window.imgRender["out_side_left_" + material +"_" + e+"_1"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_" + material +"_" + e+"_2"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_" + material +"_" + e+"_3"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_" + material +"_" + e+"_4"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_" + material +"_" + e+"_5"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_" + material +"_" + e+"_6"].set({ left: left + 24, top: top });
            window.imgRender["out_side_left_" + material +"_" + e+"_7"].set({ left: left + 245, top: top + 188 });
            window.imgRender["out_side_left_" + material +"_" + e+"_8"].set({ left: left + 380, top: top + 178 });
            window.imgRender["out_side_left_" + material +"_" + e+"_9"].set({ left: left + 526, top: top + 184 });
            window.imgRender["out_side_left_" + material +"_" + e+"_10"].set({ left: left + 815, top: top + 217 });
            window.imgRender["out_side_left_" + material +"_" + e +"_11"].set({ left: left + 20, top: top });

            window.imgRender["out_side_right_"+ material +"_" + e +"_0"].set({ left: left - 22, top: top - 13 });
            window.imgRender["out_side_right_"+ material +"_" + e +"_1"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_"+ material +"_" + e +"_2"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_"+ material +"_" + e +"_3"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_"+ material +"_" + e +"_4"].set({ left: left + 24, top: top });
            window.imgRender["out_side_right_"+ material +"_" + e +"_5"].set({ left: left + 29, top: top });
            window.imgRender["out_side_right_"+ material +"_" + e +"_6"].set({ left: left + 28, top: top + 3 });
            window.imgRender["out_side_right_"+ material +"_" + e +"_7"].set({ left: left + 606, top: top + 185 });
            window.imgRender["out_side_right_"+ material +"_" + e +"_8"].set({ left: left + 518, top: top + 168 });
            window.imgRender["out_side_right_"+ material +"_" + e +"_9"].set({ left: left + 246, top: top + 192 });
            window.imgRender["out_side_right_"+ material +"_" + e +"_10"].set({ left: left + 53, top: top + 214 });
            window.imgRender["out_side_right_"+ material +"_" + e +"_11"].set({ left: left + 26, top: top + 3.333 });

            if (i === 0) {
               for (var j = 0; j < 12; j++) {
                   that.canvas.add(window.imgRender["out_side_left_" + material + "_"+e+"_" + j]);
                   that.canvasRight.add(window.imgRender["out_side_right_" + material + "_"+e+"_" + j]);
               }
            }
            });
            this.canvas.setZoom(0.9);
            this.canvas.absolutePan(new fabric.Point(-130, 0));
            this.canvas.add(window.imgRender["imgWhiteLine"]);
            this.canvasRight.add(window.imgRender["imgWhiteRLine"]);
        }
        else if (material == window.MyValues.Material.carbon) {
            window.ColorCollection.carbon.ColorName.forEach(function(e, i) {
                window.imgRender["out_side_left_" + material +"_" + e+"_0"].set({ left: left, top: top - 13 });
                window.imgRender["out_side_left_" + material +"_" + e+"_1"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_2"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_3"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_4"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_5"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_6"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_7"].set({ left: left + 245, top: top + 188 });
                window.imgRender["out_side_left_" + material +"_" + e+"_8"].set({ left: left + 380, top: top + 178 });
                window.imgRender["out_side_left_" + material +"_" + e+"_9"].set({ left: left + 526, top: top + 184 });
                window.imgRender["out_side_left_" + material +"_" + e+"_10"].set({ left: left + 815, top: top + 217 });
                window.imgRender["out_side_left_" + material +"_" + e +"_11"].set({ left: left + 20, top: top });

                window.imgRender["out_side_right_"+ material +"_" + e +"_0"].set({ left: left - 22, top: top - 13 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_1"].set({ left: left + 24, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_2"].set({ left: left + 24, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_3"].set({ left: left + 24, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_4"].set({ left: left + 24, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_5"].set({ left: left + 29, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_6"].set({ left: left + 28, top: top + 3 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_7"].set({ left: left + 606, top: top + 185 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_8"].set({ left: left + 518, top: top + 168 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_9"].set({ left: left + 246, top: top + 192 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_10"].set({ left: left + 53, top: top + 214 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_11"].set({ left: left + 26, top: top + 3.333 });

                if (i === 0) {
                   for (var j = 0; j < 12; j++) {
                       that.canvas.add(window.imgRender["out_side_left_" + material + "_"+e+"_" + j]);
                       that.canvasRight.add(window.imgRender["out_side_right_" + material + "_"+e+"_" + j]);
                   }
                }
            });
            this.canvas.setZoom(0.9);
            this.canvas.absolutePan(new fabric.Point(-130, 0));
            this.canvas.add(window.imgRender["imgWhiteLine"]);
            this.canvasRight.add(window.imgRender["imgWhiteRLine"]);
        }
        else  if (material == window.MyValues.Material.glossy)  {
            window.ColorCollection.glossy.ColorName.forEach(function(e, i) {
                window.imgRender["out_side_left_" + material +"_" + e+"_0"].set({ left: left, top: top - 13 });
                window.imgRender["out_side_left_" + material +"_" + e+"_1"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_2"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_3"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_4"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_5"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_6"].set({ left: left + 24, top: top });
                window.imgRender["out_side_left_" + material +"_" + e+"_7"].set({ left: left + 245, top: top + 188 });
                window.imgRender["out_side_left_" + material +"_" + e+"_8"].set({ left: left + 380, top: top + 178 });
                window.imgRender["out_side_left_" + material +"_" + e+"_9"].set({ left: left + 526, top: top + 184 });
                window.imgRender["out_side_left_" + material +"_" + e+"_10"].set({ left: left + 815, top: top + 217 });
                window.imgRender["out_side_left_" + material +"_" + e +"_11"].set({ left: left + 20, top: top });

                window.imgRender["out_side_right_"+ material +"_" + e +"_0"].set({ left: left - 22, top: top - 13 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_1"].set({ left: left + 24, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_2"].set({ left: left + 24, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_3"].set({ left: left + 24, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_4"].set({ left: left + 24, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_5"].set({ left: left + 29, top: top });
                window.imgRender["out_side_right_"+ material +"_" + e +"_6"].set({ left: left + 28, top: top + 3 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_7"].set({ left: left + 606, top: top + 185 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_8"].set({ left: left + 518, top: top + 168 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_9"].set({ left: left + 246, top: top + 192 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_10"].set({ left: left + 53, top: top + 214 });
                window.imgRender["out_side_right_"+ material +"_" + e +"_11"].set({ left: left + 26, top: top + 3.333 });

                if (i === 0) {
                   for (var j = 0; j < 12; j++) {
                       that.canvas.add(window.imgRender["out_side_left_" + material + "_"+e+"_" + j]);
                       that.canvasRight.add(window.imgRender["out_side_right_" + material + "_"+e+"_" + j]);
                   }
                }
            });
            this.canvas.setZoom(0.9);
            this.canvas.absolutePan(new fabric.Point(-130, 0));
            this.canvas.add(window.imgRender["imgWhiteLine"]);
            this.canvasRight.add(window.imgRender["imgWhiteRLine"]);
        }
        //#endregion line
        this.canvas.setZoom(0.9);
        this.canvas.absolutePan(new fabric.Point(-130, 0));
        
        this.canvasRight.setZoom(0.9);
        this.canvasRight.absolutePan(new fabric.Point(-130, 0));
    }
    this.initCustomizePage = function (model, material) {
        if (!material) {
            location.href = "/Home/CustomizeNotFound";
        }
        else if (material == "metallic" && $('.ssmetallic').length == 0) {
            location.href = "/Home/CustomizeNotFound?material=metallic";
        }
        else if (material == "matte" && $('.ssmatte').length == 0) {
            location.href = "/Home/CustomizeNotFound?material=matte";
        }
        else if (material == "carbon" && $('.sscarbon').length == 0) {
            location.href = "/Home/CustomizeNotFound?material=carbon";
        }
        else if (material == "glossy" && $('.ssglossy').length == 0) {
            location.href = "/Home/CustomizeNotFound?material=glossy";
        }
        this.Init(model, material);

        var owl = $("#owl-demo");
        owl.owlCarousel({
            singleItem: true,
            loop: true,
            items:1,
            navigation: false,
            autoHeight: true,
            autoWidth:true,
            touchDrag: false,
            mouseDrag: false,
            pagination: false,
            afterMove: function(event) {
                var item = this.currentItem;
                window.myApp.mappingValue("sv", item);
            }
        });
        this.owl = owl;
        window.info = {
            currentSide: window.MyValues.Side.LeftView,
            currentMaterial: material,
            currentColorName: '',
            currentPart: '',
            leftSide :{
                currentColorName: '',
                currentPartId: '',
                material: '',
                partInfo: {
                    p1: '',
                    p2: '',
                    p3: '',
                    p4: '',
                    p5: '',
                    p6: '',
                    p7: '',
                    p8: '',
                    p9: '',
                    p10: '',
                    p11: ''
                }
            },
            rightSide: {
                currentColorName: '',
                currentPartId: '',
                material: '',
                partInfo: {
                    p1: '',
                    p2: '',
                    p3: '',
                    p4: '',
                    p5: '',
                    p6: '',
                    p7: '',
                    p8: '',
                    p9: '',
                    p10: '',
                    p11: ''
                }
            },
            pairViewSide: {
                leftSide: {
                    currentColorName: '',
                    currentPartId: '',
                    material: '',
                    partInfo: {
                        p1: '',
                        p2: '',
                        p3: '',
                        p4: '',
                        p5: '',
                        p6: '',
                        p7: '',
                        p8: '',
                        p9: '',
                        p10:'',
                        p11:''
                    }
                },
                rightSide: {
                    currentColorName: '',
                    currentPartId: '',
                    material: '',
                    partInfo: {
                        p1: '',
                        p2: '',
                        p3: '',
                        p4: '',
                        p5: '',
                        p6: '',
                        p7: '',
                        p8: '',
                        p9: '',
                        p10:'',
                        p11:''
                    }
                }
                
            },
            currentModel: model,
            currentSize: '195',
            value0_l: 'default, white',
            value0_r: 'default, white',
            value1_l: 'default, white',
            value1_r: 'default, white',
            value2_l: 'default, white',
            value2_r: 'default, white',
            value3_l: 'default, white',
            value3_r: 'default, white',
            value4_l: 'default, white',
            value4_r: 'default, white',
            value5_l: 'default, white',
            value5_r: 'default, white',
            value6_l: 'default, white',
            value6_r: 'default, white',
            value7_l: 'default, white',
            value7_r: 'default, white',
            value8_l: 'default, white',
            value8_r: 'default, white',
            value9_l: 'default, white',
            value9_r: 'default, white',
            value10_l: 'default, white',
            value10_r: 'default, white',
            value11_l: 'default, white',
            value11_r: 'default, white'
        };
        this.getPairId = function (side, meterial, color, part) {
            return "pairview_" + meterial + "_" + color + "_" + part + "_" + side;
        }
        this.getId = function (side, meterial,color,part)
        {
            return side + "_" + meterial + "_" + color + "_" + part;
        }
        this.getObjectByIndex = function (canvas, id) {
            return canvas.item(id);
        }
        this.getObjectByEleId = function(canvas,id) {
            var r = canvas._objects.filter(function(t) {
                return t._originalElement.id === id;
            });
            return r.length > 0 ? r[0] : null;
        }
        
        this.setDefaultColor= function(colorName) {
            window.info.leftSide.currentColorName = colorName;
            window.info.rightSide.currentColorName = colorName;
            for (var i = 0; i < 12; i++) {
                window.info.leftSide.partInfo["p"+i] = colorName;
                window.info.rightSide.partInfo["p"+i] = colorName;
            }
           
        };
        this.resetDefaultSide= function() {
            window.info.currentPart = null;
            this.cbxColor.value(null);
            $('#controls .btn').removeClass('active');
            $('.btnPart').removeClass('active');
        };
        
        this.canvas.on({
             
            'mouse:out': function(e) {
                if (e.target == null ) {
                    return;
                }
                var part = $(e.target._originalElement).data('part');
                if (part == "ViewSide") {
                    return;
                }
                if (window.info.leftSide.selectObjId && e.target._originalElement.id === window.info.leftSide.selectObjId) {
                    return;
                }
                e.target.filters = [];
                e.target.applyFilters();
                this.renderAll();
            },
            'mouse:over': function(e){
                if (e.target == null) {
                   
                     return;
                }
                var part = $(e.target._originalElement).data('part');
                if (part == "ViewSide") {
                    return;
                }
                if (window.info.leftSide.selectObjId && e.target._originalElement.id === window.info.leftSide.selectObjId) {
                    return;
                }
                var i = this.getObjects();
                i.forEach(function (eee, i) {
                    eee.opacity = 1;
                    eee.filters = [];
                    eee.applyFilters();
                });

                window.info.leftSide.currentObjId = e.target._element.id;
                //var part = $(e.target._originalElement).data('part');
                var tint = new fabric.Image.filters.BlendColor({
                    color: "gray"
                    //opacity : 0.7
                });
                e.target.filters.push(tint);
                e.target.applyFilters();
                this.renderAll();
            },
            
            'mouse:up': function(e) {
                if (e.target == null) return;
                var part = $(e.target._originalElement).data('part');
                if (part == "ViewSide") {
                    return;
                }
                if (window.info.leftSide.selectObjId && e.target._originalElement.id === window.info.leftSide.selectObjId) {
                    return;
                }
                var i = this.getObjects();
                i.forEach(function (eee, i) {
                    eee.opacity = 1;
                    eee.filters = [];
                    eee.applyFilters();
                });

                window.info.leftSide.selectObjId = e.target._originalElement.id;

                $('.btnPart').removeClass('active');
                $('#part_' + part).addClass('active');
                var partId = $($('.btnPart.active')).data('partid');
                window.myApp.mappingValue('pid', partId);
            },
            'mouse:dblclick': function (e) {
               
            }
        });

        this.canvasRight.on({

            'mouse:out': function (e) {
                if (e.target == null) {
                    return;
                }
                var part = $(e.target._originalElement).data('part');
                if (part == "ViewSide") {
                    return;
                }
                if (window.info.rightSide.selectObjId && e.target._originalElement.id === window.info.rightSide.selectObjId) {
                    return;
                }
                e.target.filters = [];
                e.target.applyFilters();
                this.renderAll();
            },
            'mouse:over': function (e) {
                if (e.target == null) {

                    return;
                }
                var part = $(e.target._originalElement).data('part');
                if (part == "ViewSide") {
                    return;
                }
                if (window.info.rightSide.selectObjId && e.target._originalElement.id === window.info.rightSide.selectObjId) {
                    return;
                }
                var i = this.getObjects();
                i.forEach(function (eee, i) {
                    eee.opacity = 1;
                    eee.filters = [];
                    eee.applyFilters();
                });

                window.info.rightSide.currentObjId = e.target._element.id;
                //var part = $(e.target._originalElement).data('part');
                var tint = new fabric.Image.filters.BlendColor({
                    color: "gray"
                    //opacity : 0.7
                });
                e.target.filters.push(tint);
                e.target.applyFilters();
                this.renderAll();
            },

            'mouse:up': function (e) {
                if (e.target == null) return;
                var part = $(e.target._originalElement).data('part');
                if (part == "ViewSide") {
                    return;
                }
                if (window.info.rightSide.selectObjId && e.target._originalElement.id === window.info.rightSide.selectObjId) {
                    return;
                }
                var i = this.getObjects();
                i.forEach(function (eee, i) {
                    eee.opacity = 1;
                    eee.filters = [];
                    eee.applyFilters();
                });

                window.info.rightSide.selectObjId = e.target._originalElement.id;

                $('.btnPart').removeClass('active');
                $('#part_' + part).addClass('active');
                var partId = $($('.btnPart.active')).data('partid');
                window.myApp.mappingValue('pid', partId);
            },
            //'object:moving': function (opt) {
            //    if (!$('#notify') && $('#notify').length == 0) return;
            //    $('#notify').html(JSON.stringify({
            //        left: opt.target.left,
            //        top: opt.target.top,
            //        scaleX: opt.target.scaleX,
            //        scaleY: opt.target.scaleY,
            //        src: opt.target._originalElement.src,
            //        id: opt.target._originalElement.id
            //    }));
            //    console.clear();
            //    //console.log(opt.target);
            //    console.log({ left: opt.target.left, top: opt.target.top, scaleX: opt.target.scaleX, scaleY: opt.target.scaleY });

            //},
        });

        this.canvasPair.on({
            'object:moving': function (opt) {
                if (!$('#notify') && $('#notify').length == 0) return;
                $('#notify').html(JSON.stringify({
                    left: opt.target.left,
                    top: opt.target.top,
                    scaleX: opt.target.scaleX,
                    scaleY: opt.target.scaleY,
                    src: opt.target._originalElement.src,
                    id: opt.target._originalElement.id
                }));
                console.clear();
                //console.log(opt.target);
                console.log({ left: opt.target.left, top: opt.target.top, scaleX: opt.target.scaleX, scaleY: opt.target.scaleY});
                
            },
        });
        this.activeLeftObj = function (id, selectObj) {
            
            var i = this.canvas.getObjects();
            i.forEach(function (eee, i) {
                eee.opacity = 1;
                eee.filters = [];
                eee.applyFilters();
            });
            window.info.leftSide.selectObjId = id;
            var part = $('#'+id).data('part');
            $('.btnPart').removeClass('active');
            $('#part_' + part).addClass('active');
            var tint = new fabric.Image.filters.BlendColor({
                color: "#124A6D"
            });
            var sValue = this.getObjectByEleId(this.canvas, id);
            //sValue.filters.push(tint);
            //sValue.applyFilters();
            if (selectObj) {
                this.canvas.setActiveObject(sValue);
            }
         
        }
       
        this.handleLine = function() {
            if (window.info.currentSide === window.MyValues.Side.LeftView) {
                switch (window.info.currentColorName) {
                    case window.ColorName.Black:
                    case window.ColorName.Blue:
                    case window.ColorName.Gray:
                        this.canvas.bringToFront(window.imgRender["imgWhiteLine"]);
                        break;
                    default:
                        this.canvas.bringToFront(window.imgRender["imgblackLine"]);
                        break;
                }
                this.canvas.renderAll();
            }
            else if (window.info.currentSide === window.MyValues.Side.RightView) {

                switch (window.info.currentColorName) {
                case window.ColorName.Black:
                case window.ColorName.Blue:
                case window.ColorName.Gray:
                    this.canvasRight.bringToFront(window.imgRender["imgWhiteRLine"]);
                    break;
                default:
                    this.canvasRight.bringToFront(window.imgRender["imgblackRLine"]);
                    break;
                }

                this.canvasRight.renderAll();
            }
            
        }
        this.getColorFromName = function( name) {
            return window.MyValues.Color[name];

            //switch (name) {
            //    case window.ColorName.Silver:
            //        return window.MyValues.Color.Silver;
            //    case window.ColorName.Gold:
            //        return window.MyValues.Color.Gold;
            //    case window.ColorName.Black:
            //        return window.MyValues.Color.Black;
            //    case window.ColorName.Blue:
            //        return window.MyValues.Color.Blue;
            //    case window.ColorName.Green:
            //        return window.MyValues.Color.Green;
            //    case window.ColorName.Lime:
            //        return window.MyValues.Color.Lime;
            //    case window.ColorName.Orange:
            //        return window.MyValues.Color.Orange;
            //    case window.ColorName.Pink:
            //        return window.MyValues.Color.Pink;
            //    case  window.ColorName.Purple:
            //        return window.MyValues.Color.Purple;
            //    case window.ColorName.Red:
            //        return window.MyValues.Color.Red;
            //    case window.ColorName.UltraBlue:
            //        return window.MyValues.Color.UltraBlue;
            //}
            
        }
        this.getColorName = function( value) {
            
            switch (value) {
                case window.MyValues.Color.Silver:
                    return window.ColorName.Silver;
                case window.MyValues.Color.Gold:
                    return window.ColorName.Gold;
                case window.MyValues.Color.Black:
                    return window.ColorName.Black;
                case window.MyValues.Color.Gray:
                    return window.ColorName.Gray;
                case window.MyValues.Color.Blue:
                    return window.ColorName.Blue;
                case window.MyValues.Color.Green:
                    return window.ColorName.Green;
                case window.MyValues.Color.Lime:
                    return window.ColorName.Lime;
                case window.MyValues.Color.Orange:
                    return window.ColorName.Orange;
                case window.MyValues.Color.Pink:
                    return window.ColorName.Pink;
                case window.MyValues.Color.Purple:
                    return window.ColorName.Purple;
                case window.MyValues.Color.Red:
                    return window.ColorName.Red;
                case window.MyValues.Color.UltraBlue:
                    return window.ColorName.UltraBlue;
                case window.MyValues.Color.White:
                    return window.ColorName.White;
                case window.MyValues.Color.Yellow:
                    return window.ColorName.Yellow;
                default:
                    return null;
            }
            
        }
        this.mappingValue = function (type, value) {
            switch (type) {
                
                case "si"://select size
                    window.info.currentSize = value;
                    break;
                case "pid"://part info change
                    window.info.currentPart = value;

                    var id = window.myApp.getId(window.info.currentSide, window.info.currentMaterial, window.info.currentColorName, window.info.currentPart);
                    var partColor = "";
                    if (window.info.currentSide == window.MyValues.Side.LeftView) 
                    {
                        window.myApp.activeLeftObj(id, false);
                        partColor = window.info.leftSide.partInfo["p" + value];
                    }
                    else if (window.info.currentSide == window.MyValues.Side.RightView)
                    {
                        partColor = window.info.rightSide.partInfo["p" + value];
                    }
                    if (partColor) {
                        var colorValue = window.MyValues.Color[partColor];
                        window.myApp.cbxColor.value(colorValue);
                        this.handleLine();
                    }
                    break;
                case "sv"://side view change
                    var activeObj0 = this.canvas.getActiveObject();
                    if (activeObj0) {
                        activeObj0.filters = [];
                        activeObj0.applyFilters();
                        this.canvas.renderAll();
                    }

                    var activeObj1 = this.canvasRight.getActiveObject();
                    if (activeObj1) {
                        activeObj1.filters = [];
                        activeObj1.applyFilters();
                        this.canvasRight.renderAll();
                    }

                    switch (value) {
                        case 0:
                            window.info.currentSide = window.MyValues.Side.LeftView;
                            this.resetDefaultSide();
                            $('#rightControl').show();
                            $('#panel-chooseMaterial').show();
                            $('#moreview1').addClass('active');
                            $("#export").hide();
                            break;
                        case 1:
                            window.info.currentSide = window.MyValues.Side.RightView;
                            this.resetDefaultSide();
                            $('#rightControl').show();
                            $('#panel-chooseMaterial').show();
                            $('#moreview2').addClass('active');
                            $("#export").hide();
                            break;
                        default :
                            $("#export").attr("disabled","disabled");
                            $("#export").hide();
                            window.info.currentSide = window.MyValues.Side.PairView;
                            this.resetDefaultSide();
                            $('#panel-chooseMaterial').hide();
                            $('#rightControl').hide();
                            $('#moreview3').addClass('active');
                            var canvasDataURL = this.canvas.toDataURL();
                            var canvasRDataURL = this.canvasRight.toDataURL();

                            var imageLeftCanvas = $('#p_l');
                            imageLeftCanvas.prop('src',canvasDataURL);

                            var imageRCanvas = $('#p_r');
                            imageRCanvas.prop('src',canvasRDataURL);

                            this.canvasPair.clear();
                            $("#progress").fadeIn(50);

                            setTimeout(function() {
                                var leftCloneImg = new fabric.Image($('#p_l')[0]);
                                leftCloneImg.lockMovementX = false;
                                leftCloneImg.lockMovementY = false;
                                leftCloneImg.perPixelTargetFind = true;
                                leftCloneImg.selectable = true;
                                leftCloneImg.evented = false;
                                leftCloneImg.left = 170;
                                leftCloneImg.top = -10;
                                leftCloneImg.scale(0.8);

                                var pairviewleftside = new fabric.Textbox("LEFT SIDE",
                                    {
                                        left: 0,
                                        top: 50,
                                        width: 200,
                                        fontSize: 18,
                                        fontWeight:700,
                                        lineHeight:60,
                                        lockMovementX : true,
                                        lockMovementY : true,
                                        selectable : false,
                                        evented : false
                                    });
                               
                                var pairviewrightside = new fabric.Textbox("RIGHT SIDE",
                                    {
                                        left: 0,
                                        top: 400,
                                        width: 200,
                                        fontSize: 18,
                                        fontWeight:700,
                                        lineHeight:60,
                                        lockMovementX : true,
                                        lockMovementY : true,
                                        selectable : false,
                                        evented : false
                                    });

                                var leftCloneImg = new fabric.Image($('#p_l')[0]);
                                leftCloneImg.lockMovementX = true;
                                leftCloneImg.lockMovementY = true;
                                leftCloneImg.perPixelTargetFind = false;
                                leftCloneImg.selectable = false;
                                leftCloneImg.evented = false;
                                leftCloneImg.left = 170;
                                leftCloneImg.top = -10;
                                leftCloneImg.scale(0.8);

                                var rightCloneImg = new fabric.Image($('#p_r')[0]);
                                rightCloneImg.lockMovementX = true;
                                rightCloneImg.lockMovementY = true;
                                rightCloneImg.perPixelTargetFind = false;
                                rightCloneImg.selectable = false;
                                rightCloneImg.evented = false;
                                rightCloneImg.scale(0.8);
                                rightCloneImg.left = 170;
                                rightCloneImg.top = 350;
                                window.myApp.canvasPair.add(leftCloneImg);
                                window.myApp.canvasPair.add(rightCloneImg);
                                window.myApp.canvasPair.add(pairviewleftside);
                                window.myApp.canvasPair.add(pairviewrightside);

                                window.myApp.canvasPair.renderAll();
                                $("#progress").fadeOut(100);
                                $("#export").removeAttr("disabled");
                                $("#export").show();
                            },1000);
                            
                            //for (var i = 1; i < 12; i++) {
                            //    if (i == 10) continue;
                            //    var lIndex = (i * 2 - 1);
                            //    var rIndex = lIndex + 1;
                            //    if (i > 10) {
                            //        lIndex = ((i-1) * 2) - 1;
                            //        rIndex = lIndex + 1;
                            //    }
                            //    var processI = i;
                            //    var cLeftColorName = window.info.leftSide.partInfo["p" + processI];
                            //    var pi = this.getPairId("l", window.info.currentMaterial, cLeftColorName, processI);
                            //    var lItem = this.canvasPair.item(lIndex);
                            //    var orginLColor = $(lItem._originalElement).data('color');
                            //    if (orginLColor != cLeftColorName) {
                            //        this.canvasPair.remove(lItem);
                            //        this.canvasPair.insertAt(window.imgRender[pi], lIndex);
                            //    }
                                
                            //    var riColorName = window.info.rightSide.partInfo["p" + processI];
                            //    var rpi = this.getPairId("r", window.info.currentMaterial, riColorName, processI);
                            //    var rItem = this.canvasPair.item(rIndex);
                            //    var orginRColor = $(rItem._originalElement).data('color');
                            //    if (orginRColor != riColorName) {
                            //        this.canvasPair.remove(rItem);
                            //        this.canvasPair.insertAt(window.imgRender[rpi], rIndex);
                            //    }
                            //}
                            break;
                    }
                    break;
                case "mt"://material change
                    window.info.currentMaterial = value;
                    break;
                   
                case "cl"://color change on part 
                    var part = $($('.btnPart.active')).data('partid');
                    var newColor = "";
                    if (window.info.currentSide === window.MyValues.Side.LeftView ) {
                        newColor = this.getColorName(value);
                        if (!newColor) return;
                        var currentColorName = window.info.leftSide.partInfo["p" + part];
                        var currentPartId = this.getId(window.info.currentSide, window.info.currentMaterial, currentColorName, part);
                        if (newColor == currentColorName) return;
                        
                        var newPartId = this.getId(window.info.currentSide, window.info.currentMaterial, newColor, part);
                        var sValue = this.getObjectByEleId(this.canvas, currentPartId);
                        
                        if (sValue == null) {
                            console.error("error code:1176 ");
                            return;
                        };
                        var activeObj = this.canvas.getActiveObject();
                        if (activeObj) {
                            activeObj.filters = [];
                            activeObj.applyFilters();
                        }
                        window.info.leftSide.partInfo["p" + part] = newColor;
                        this.canvas.remove(sValue);
                        this.canvas.insertAt(window.imgRender[newPartId],part);
                    }
                    else if (window.info.currentSide === window.MyValues.Side.RightView) {
                        newColor = this.getColorName(value);
                        if (!newColor) return;
                        var currentRColor = window.info.rightSide.partInfo["p" + part];
                        var currentRPartId = this.getId(window.info.currentSide, window.info.currentMaterial, currentRColor, part);
                        if (newColor == currentRColor) return;
                        
                        var newRPartId = this.getId(window.info.currentSide, window.info.currentMaterial, newColor, part);
                        var sRValue = this.getObjectByEleId(this.canvasRight, currentRPartId);

                        if (sRValue == null) {
                            console.error("error code::1199");
                            return;
                        };
                        var activeRObj = this.canvasRight.getActiveObject();
                        if (activeRObj) {
                            activeRObj.filters = [];
                            activeRObj.applyFilters();
                        }
                        window.info.rightSide.partInfo["p" + part] = newColor;
                        this.canvasRight.remove(sRValue);
                        this.canvasRight.insertAt(window.imgRender[newRPartId], part);
                    }
                    
                    //this.handleLine();
                break;
            }
            this.canvas.renderAll();
        }
        

        $("#cbxMaterial").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            optionLabel: "Choose Material",
            index: 0,
            change: function (e) {
                var value = this.value();
                window.location.href = "/Home/Customize?model=" + window.info.currentModel + "&material=" + value;
            },
            dataSource: {
                data: [
                    { value: 'glossy', text: 'GLOSSY', class: 'c_m_1' },
                    { value: 'matte', text: 'MATTE', class: 'c_m_2' },
                    { value: 'metallic', text: 'METALLIC', class: 'c_m_3' },
                    { value: 'carbon', text: 'CARBON', class: 'c_m_4' }
                ]
            }
        });
        this.cbxMaterial = $("#cbxMaterial").data('kendoDropDownList');
        material = material || "metallic";
        this.cbxMaterial.value(material);
        window.info.currentMaterial = material;
       
        var colorCl = window.ColorCollection.metallic.Values;
        if (material === window.MyValues.Material.carbon) {
            colorCl = window.ColorCollection.carbon.Values;
            window.info.currentColorName = window.ColorCollection.carbon.ColorName[0];
        }
        else if (material === window.MyValues.Material.glossy) {
            colorCl = window.ColorCollection.glossy.Values;
            window.info.currentColorName = window.ColorCollection.glossy.ColorName[0];
        }
        else if (material === window.MyValues.Material.matte) {
            colorCl = window.ColorCollection.matte.Values;
            window.info.currentColorName = window.ColorCollection.matte.ColorName[0];
        } else  if (material === window.MyValues.Material.metallic) {
            colorCl = window.ColorCollection.metallic.Values;
            window.info.currentColorName = window.ColorCollection.metallic.ColorName[0];
        }

        $("#cbxColor").kendoColorPalette({
            columns: 6,
            tileSize: {
                width: 24,
                height: 15
            },
            palette: colorCl,
            change: function (e) {
                var value = this.value();
                window.myApp.mappingValue("cl", value.toLowerCase());
            }
        });
        this.cbxColor = $("#cbxColor").data('kendoColorPalette');
       
        this.setDefaultColor(window.info.currentColorName);
        $("#cbxModelInline").kendoDropDownList({
            dataTextField: "Name",
            dataValueField: "Id",
            optionLabel: "CHOOSE MODEL",
            valueTemplate: '<span>#=data.name #</span>',
            template: '<div class="dropdown-img-wrapper"><img class="dropdown_img" src="~/Content/imgs/image.png" /></div><span>#=data.name #</span>',
            change: function (e) {
                var value = this.value();
                window.myApp.mappingValue("mi", value);
            },
            dataSource: {
                data: [
                    { Id: 'il_1', name: 'VUCAN', class: 'c_il_1' },
                    { Id: 'il_2', name: 'CHAMPION', class: 'c_il_2' },
                    { Id: 'il_3', name: 'RAINBOW', class: 'c_il_3' }
                ]
            },
            height: 500
        });
        this.cbxModelInline = $("#cbxModelInline").data('kendoDropDownList');
        $("#cbxSize").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            optionLabel: "CHOOSE SIZE",
            index: 0,
            change: function (e) {
                var value = this.value();
                window.myApp.mappingValue("si", value);
            },
            dataSource: {
                data: [
                    { value: '195', text: '195', class: 'c_m_1' },
                    { value: '200', text: '200', class: 'c_m_2' },
                    { value: '205', text: '205', class: 'c_m_2' },
                    { value: '210', text: '210', class: 'c_m_2' },
                    { value: '215', text: '215', class: 'c_m_2' },
                    { value: '220', text: '220', class: 'c_m_2' },
                    { value: '225', text: '225', class: 'c_m_2' },
                ]
            }
        });
        this.cbxMaterial = $("#cbxMaterial").data('kendoDropDownList');
        $('.btnPart').off('click');
        $('.btnPart').on('click', function (e) {
            var that = this;
            if ($(that).hasClass('active')) return;
            $('.btnPart').removeClass('active');
            $(that).addClass('active');
            var partId = $(this).data('partid');
            window.myApp.mappingValue('pid', partId);

            //reset 
        });
        $('#moreview1').click(function () {
            var owl = $("#owl-demo").data('owlCarousel');
            owl.goTo(0);
        });
        $('#moreview2').click(function () {
            var owl = $("#owl-demo").data('owlCarousel');
            owl.goTo(1);
        });
        $('#moreview3').click(function () {
            var owl = $("#owl-demo").data('owlCarousel');
            owl.goTo(2);
        });
        $('#export').click(function (e) {
           
            var ee = document.getElementById("canvasPair");
            
            var activeObj = window.myApp.canvasPair.getActiveObject();
            if (activeObj) {
                activeObj.filters = [];
                activeObj.applyFilters();
                this.canvas.renderAll();
            }
           
            kendo.drawing.drawDOM(ee)
                .then(function (group) {
                    // Render the result as a PDF file
                    var lineH = 24;
                    var font = { font: "bold 15px Arial" };
                    var fontLabel = { font: "normal 15px Arial" };
                    var fontContent = { font: "italic 14px 'Open Sans', sans-serif" };
                    var rightBase = 450;
                    var topBase = 560;
                    var value = {};
                    value["000"] = window.info.currentModel;
                    value["001"] = window.info.currentMaterial;
                    value["002"] = window.info.currentSize;

                    value["1p"] = 80;
                    value["10"] = "1. Front:";
                    value["11"] = window.info.leftSide.partInfo.p1;
                    value["12"] = "1. Front:";
                    value["13"] = window.info.rightSide.partInfo.p1;

                    value["2p"] = 80;
                    value["20"] = "2. Cover:";
                    value["21"] = window.info.leftSide.partInfo.p2;
                    value["22"] = "2. Cover:";
                    value["23"] = window.info.rightSide.partInfo.p2;

                    value["3p"] = 130;
                    value["30"] = "3. Cover Strap:";
                    value["31"] = window.info.leftSide.partInfo.p3;
                    value["32"] = "3. Cover Strap:";
                    value["33"] = window.info.rightSide.partInfo.p3;

                    value["4p"] = 130;
                    value["40"] = "4. Ankle Strap:";
                    value["41"] = window.info.leftSide.partInfo.p4;
                    value["42"] = "4. Ankle Strap:";
                    value["43"] = window.info.rightSide.partInfo.p4;

                    value["5p"] = 75;
                    value["50"] = "5. Back:";
                    value["51"] = window.info.leftSide.partInfo.p5;
                    value["52"] = "5. Back:";
                    value["53"] = window.info.rightSide.partInfo.p5;

                    value["6p"] = 100;
                    value["60"] = "6. BackTop:";
                    value["61"] = window.info.leftSide.partInfo.p6;
                    value["62"] = "6. BackTop:";
                    value["63"] = window.info.rightSide.partInfo.p6;

                    value["7p"] = 140;
                    value["70"] = "7. LogoCity Run:";
                    value["71"] = window.info.leftSide.partInfo.p7;
                    value["72"] = "7. LogoCity Run:";
                    value["73"] = window.info.rightSide.partInfo.p7;

                    value["8p"] = 150;
                    value["80"] = "8. Text Rainbow:";
                    value["81"] = window.info.leftSide.partInfo.p8;
                    value["82"] = "8. Text Rainbow:";
                    value["83"] = window.info.rightSide.partInfo.p8;

                    value["9p"] = 150;
                    value["90"] = "9. Text Shorttack:";
                    value["91"] = window.info.leftSide.partInfo.p9;
                    value["92"] = "9. Text Shorttack:";
                    value["93"] = window.info.rightSide.partInfo.p9;

                    value["10p"] = 120;
                    value["100"] = "10.Logo CTR:";
                    value["101"] = window.info.leftSide.partInfo.p10;
                    value["102"] = "10.Logo CTR:";
                    value["103"] = window.info.rightSide.partInfo.p10;

                    value["11p"] = 110;
                    value["110"] = "11.Tongue:";
                    value["111"] = window.info.leftSide.partInfo.p11;
                    value["112"] = "11.Tongue:";
                    value["113"] = window.info.rightSide.partInfo.p11;

                    var text = {};
                    //var colorText = "";
                    //$.each(window.ColorName, function(e,i) {
                    //    colorText += "    " + e;
                    //});
                    //text["0"] = new kendo.drawing.Text(colorText,new kendo.geometry.Point(0, 450), font);
                    text["00"] = new kendo.drawing.Text(
                        kendo.format("CONFIGURATION :Model: {0} | Material: {1} | Size:{2}", value["000"], value["001"], value["002"]), new kendo.geometry.Point(0, 530), font);
                    text["01"] = new kendo.drawing.Text(
                        "Left:", new kendo.geometry.Point(0, topBase +10), font);
                    text["02"] = new kendo.drawing.Text(
                        "Right:", new kendo.geometry.Point(rightBase, topBase + 10), font);
                    var path = new kendo.drawing.Path({
                            stroke: {
                                color: "#555",
                                width: 2,
                                lineCap: "round"
                            }
                        })
                        .moveTo(0, 555)
                        .lineTo(1200, 555);
                        //.moveTo(0, 526)
                        //.lineTo(1200, 526);
                    for (var j = 1; j < 12; j++) {
                        for (var jj = 0; jj < 4; jj++) {
                            var e = {};
                            var pointOfColor = {};
                            var currentDrawColor = window.myApp.getColorFromName(value[kendo.format("{0}{1}", j, jj)]);
                            switch (jj) {
                                case 0:
                                    e = new kendo.drawing.Text(value[kendo.format("{0}{1}", j, jj)], new kendo.geometry.Point(10, topBase +8 + lineH * j), fontLabel);
                                    break;
                                case 1:
                                    e = new kendo.drawing.Text(value[kendo.format("{0}{1}", j, jj)], new kendo.geometry.Point(10 + value[kendo.format("{0}p", j)], topBase + 8 + lineH * j), fontContent);
                                    pointOfColor = new kendo.geometry.Rect([ 70 + value[kendo.format("{0}p", j)], topBase +8 + lineH * j], [18, 18]);
                                    break;
                                case 2:
                                    e = new kendo.drawing.Text(value[kendo.format("{0}{1}", j, jj)], new kendo.geometry.Point(rightBase + 10, topBase + 8 + lineH * j), fontLabel);
                                    break;
                                case 3:
                                    e = new kendo.drawing.Text(value[kendo.format("{0}{1}", j, jj)], new kendo.geometry.Point(rightBase + 10 + value[kendo.format("{0}p", j)], topBase + 8 + lineH * j), fontContent);
                                    pointOfColor = new kendo.geometry.Rect([rightBase + 70 + value[kendo.format("{0}p", j)], topBase + 8 + lineH * j], [18, 18]);
                                    break;
                            }

                            group.append(e);
                            //if (!$.isEmptyObject(pointOfColor)) {
                            //    group.append(new kendo.drawing.Rect(pointOfColor, {
                            //        fill: {
                            //            color: currentDrawColor
                            //        }
                            //    }));
                            //}
                            
                        }
                    }
                    
                    group.append(path);
                    //line for config
                    $.each(text, function (i, e) {
                        group.append(e);
                    });

                    return kendo.drawing.exportPDF(group, {
                        paperSize: "auto",
                        margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
                    });
                })
                .done(function (data) {
                    // Save the PDF file
                    kendo.saveAs({
                        dataURI: data,
                        fileName: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36) + ".pdf"
                    });
                    
                });

        });
    }
}

function gohome(parameters) {
    window.location.href = "/";
    window.reload(true);
}
$(document).ready(function () {
    //$('body').height(window.innerHeight );
});


