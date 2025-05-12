export const h4 = `

vec3 h4_colors [5];
float h4_points [5];

void h4_initia(){
	h4_colors[0]=vec3(0.,0.,0.6);
	h4_colors[1]=vec3(0.,1.,1.);
	h4_colors[2]=vec3(0.0,1.0,0.);
	h4_colors[3]=vec3(1.0,1.0,0.);
	h4_colors[4]=vec3(1.0,0.0,0.);
	h4_points[0]=0.;
	h4_points[1]=0.15;
	h4_points[2]=0.5;
	h4_points[3]=0.65;
	h4_points[4]=1.0;
}

vec3 h4_gradian(vec3 c1,vec3 c2,float a){
	return vec3(c1.x+a*(c2.x-c1.x),
				c1.y+a*(c2.y-c1.y),
				c1.z+a*(c2.z-c1.z));
}

vec3 h4_color(float weight){
	if(weight<=h4_points[0]){
		return h4_colors[0];
	}
	if(weight>=h4_points[4]){
		return h4_colors[4];
	}
	for(int i=1;i<5;i++){
		if(weight<h4_points[i]){
		float a=(weight-h4_points[i-1])/(h4_points[i]-h4_points[i-1]);
			return h4_gradian(h4_colors[i-1],h4_colors[i],a);
		}
	}
}

`