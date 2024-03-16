document.addEventListener("DOMContentLoaded",function(){
    $("#fontselect").load("fonts.html",function(){
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        
        const segment = canvas.parentElement;
        canvas.width = segment.clientWidth;
        canvas.height = segment.clientHeight;
        
        const fontselect = document.getElementById('fontselect');
        const colorpicker = document.getElementById('colorpicker');
        const textpicker = document.getElementById('textpicker');
        const fontsizeinput = document.getElementById('fontsizeinput');
        
        drawTextWithFont();

        fontsizeinput.addEventListener('input',()=>{
            drawTextWithFont();
        });
        
        textpicker.addEventListener('input',()=>{
            const text = textpicker.value;
            drawText(text);
        });
        
        fontselect.addEventListener('input', () => {
            drawTextWithFont();
        });
        
        colorpicker.addEventListener('input', () => {
            ctx.fillStyle = colorpicker.value;
            const text = textpicker.value;
            drawText(text);
        });
        
        function drawText(text) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const textWidth = ctx.measureText(text).width;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        }

        function drawTextWithFont(){
            const font = new FontFace(fontselect.value, `url(fonts/${fontselect.value}.ttf)`);
            font.load().then(() => {
                document.fonts.add(font);
                ctx.font = `${fontsizeinput.value}px ` + fontselect.value;
                ctx.fillStyle = colorpicker.value;
                const text = textpicker.value;
                drawText(text);
            });
        }
        
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.addEventListener('click', () => {
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'logo.png';
            link.click();
        });
        
        $("#randomizeBtn").click(function(){
            $("#canvasegment").addClass("loading");
            $("#randomizeBtn").addClass("disabled");

            const fontOptions = [];
            for (let i = 0; i < fontselect.options.length; i++) {
                fontOptions.push(fontselect.options[i].value);
            }
            const randomIndex = Math.floor(Math.random() * fontOptions.length);
            const randomFont = fontOptions[randomIndex];
            fontselect.value = randomFont;
            const randomRed = Math.floor(Math.random() * 256);
            const randomGreen = Math.floor(Math.random() * 256);
            const randomBlue = Math.floor(Math.random() * 256); 
            const randomColor = `#${randomRed.toString(16)}${randomGreen.toString(16)}${randomBlue.toString(16)}`;
            colorpicker.jscolor.fromString(randomColor);
            drawTextWithFont();
            setTimeout(() => {
                $("#canvasegment").removeClass("loading");
                $("#randomizeBtn").removeClass("disabled");
            }, 1000);
        });
    });

});

