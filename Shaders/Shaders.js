///*****SHADER INITIALIZATION CODE*****///
var colorShader; //Shader to use vertex colors with lighting

function getShader(gl, filename, type) {
	var shadersrc = "";
	var shader;
	var request;
	if (type == "fragment") {
	    shader = gl.createShader(gl.FRAGMENT_SHADER);
	} 
	else if (type == "vertex") {
	    shader = gl.createShader(gl.VERTEX_SHADER);
	} 
	else {
	    return null;
	}

	//TODO: Get rid of synchronous mode
	$.ajax({
	    async: false,
	    url: filename,
	    success: function (data) {
	        shadersrc = data;
	    },
	    dataType: 'text'
	});
	
	gl.shaderSource(shader, shadersrc);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	    alert(gl.getShaderInfoLog(shader));
	    return null;
	}

	return shader;
}


function initShaders() {
	//Ordinary texture shader
	var fragmentShader = getShader(gl, "./FragmentShader.glsl", "fragment");
	var vertexShader = getShader(gl, "./VertexShader.glsl", "vertex");

	colorShader = gl.createProgram();
	gl.attachShader(colorShader, vertexShader);
	gl.attachShader(colorShader, fragmentShader);
	gl.linkProgram(colorShader);

	if (!gl.getProgramParameter(colorShader, gl.LINK_STATUS)) {
	    alert("Could not initialise shaders");
	}

	colorShader.vPosAttrib = gl.getAttribLocation(colorShader, "vPos");
	gl.enableVertexAttribArray(colorShader.vPosAttrib);
	colorShader.normalAttrib = gl.getAttribLocation(colorShader, "vNormal");
	gl.enableVertexAttribArray(colorShader.normalAttrib);
	colorShader.colorAttrib = gl.getAttribLocation(colorShader, "vColor");
	gl.enableVertexAttribArray(colorShader.colorAttrib);

	colorShader.pMatrixUniform = gl.getUniformLocation(colorShader, "uPMatrix");
	colorShader.mvMatrixUniform = gl.getUniformLocation(colorShader, "uMVMatrix");
}
