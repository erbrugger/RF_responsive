jQuery.fn.sliderBlock = function (settings) {
    return this.each(function (i) {
        aBlockSlider.sliderWidth = parseInt(jQuery(".block_slider").css("width"));
        aBlockSlider.init(settings, this);
    });
};

var aBlockSlider = {
    sliderWidth: 0,
    init: function (s, p) {
        var itemContainerWidth = jQuery(".item", p).length * parseInt(jQuery(".item", p).css("width"));
        jQuery(".container", p).css("width", itemContainerWidth + "px");

        var frameWidth = parseInt( $( '.content-top > .next').css('width') );
        var itemWidth = parseInt(jQuery(".item", p).css("width"));
        var itemLength = jQuery(".item", p).length;
        var itemContainerWidth = itemLength * itemWidth;
        //alert("frameWidth=" + frameWidth + " >= itemContainerWidth=" + itemContainerWidth + "; ");
        if (frameWidth == 0)
            frameWidth = 980;
        if (frameWidth >= itemContainerWidth)
            jQuery(".next", p).hide();

        var animating = true;

       // first part was here
        $( '.next').click(function() {
            var frameWidth = parseInt( $( '.content-top > .next').css('width') );
            var itemWidth = parseInt(jQuery(".item", p).css("width"));
            var itemLength = jQuery(".item", p).length;
            var itemContainerWidth = itemLength * itemWidth;

            if (animating) {
                var edgeWidth = itemContainerWidth - frameWidth;
                var itemContainerLeft = parseInt(jQuery(".container", p).css("left"));
                var step = edgeWidth + itemContainerLeft;

                if (step > frameWidth)
                    step = frameWidth;

                if (step > 0) {
                    animating = false;
                    animateLeft = itemContainerLeft - step;
                    jQuery(".container", p).animate({ left: animateLeft }, "fast", function () { animating = true; });
                } else {
                    jQuery(".container", p).animate({ left: 0 }, "middle", function () { animating = true; });
                }

            } else {
                animating = true;
            }

            return false;
        });
    }
};

jQuery(function () {
    jQuery(".block_slider").sliderBlock();
});