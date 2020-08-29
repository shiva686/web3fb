entry :'./main.js',

output : {
 path:'/target',
 fiename:'index.js',
},

devServer:{
	inline: true,
	port: 8090
},

module: { 

	loaders: \[
	{
		test:/\\.jsx?$/,
		exclude: /node\_modules/,
		loader:'bable-loader',
		query: {
			presets:\['ex2015','react'\
			]
		}
	  }
    ]
  }

 module.exports = config