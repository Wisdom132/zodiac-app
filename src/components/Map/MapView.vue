<template>
	<div class="map-view h-100 w-100 bg-grey-2 pt-5">
		<div :class="`cm${posterSize}`" class="map-container elevation-3 bg-white pos-rel pa-4 mx-auto">
			<div id="mapboxgl-container" class="pos-rel">
				<v-card outlined class="zoom-in-out pos-abs pa-1">
					<v-btn @click="map.zoomIn()" small icon class="d-block">
						<v-icon color="black">mdi-plus</v-icon>
					</v-btn>
					<v-btn @click="map.zoomOut()" small icon>
						<v-icon color="black">mdi-minus</v-icon>
					</v-btn>
				</v-card>
			</div>
			<div class="texts ta-c mt-3">
				<h2 class="mv-title">BERLIN</h2>
				<h5 class="mv-subtitle lead">Germany</h5>
				<p class="overline">23.754541, 90.379705</p>
			</div>
			<div class="poster-sizes ta-c">
				<select v-model="posterSize" class="mt-2">
					<option value="30-40">30 x 40 cm</option>
					<option value="50-70">50 x 70 cm</option>
					<option value="70-100">70 x 100 cm</option>
				</select>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex"
// Mapbox GL
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import "mapbox-gl/dist/mapbox-gl.css"
import bus from "@/bus"
import jsPDF from 'jspdf';

export default {
	name: "map-view",
	data: () => ({
		map: null,
		accessToken:'pk.eyJ1IjoidXJiYW5nYXJkbmVyIiwiYSI6ImNpaWFsM2c0cjAwMjR3M20wcWlpZTdicDEifQ.q7PbVaiYnqH-GvRCDitb1w',
		// accessToken:'pk.eyJ1IjoiYWlkaWR0YWhhIiwiYSI6ImNrOTEwZzhqODA3a2Izc3VtbmhkdWpuY2EifQ.8qmdRgEGPdAdZdQOTICEKw',
		styles: {
			streets: "mapbox://styles/mapbox/streets-v11",
			outdoors: "mapbox://styles/mapbox/outdoors-v11",
			light: "mapbox://styles/mapbox/light-v10",
			dark: "mapbox://styles/mapbox/dark-v10",
			satellite: "mapbox://styles/mapbox/satellite-v9",
			satelliteStreets: "mapbox://styles/mapbox/satellite-streets-v11",
			npDay: "mapbox://styles/mapbox/navigation-preview-day-v4",
			npNight: "mapbox://styles/mapbox/navigation-preview-night-v4",
			ngDay: "mapbox://styles/mapbox/navigation-guidance-day-v4",
			ngNight: "mapbox://styles/mapbox/navigation-guidance-night-v4",
			Pencil: "mapbox://styles/urbangardner/ck1tehto10u7u1cp80pkth6u7",
			Blue: "mapbox://styles/urbangardner/ck8rrtefk1hia1ip9enms5zel",
			RoyLichtenstein: "mapbox://styles/urbangardner/ck8oajssv3e791ipjojj9202d"

		},
		posterSize: "30-40",
		selectedStyle: null
	}),
	created() {
		let lastWidth = window.innerWidth, lastHeight = window.innerHeight
		window.addEventListener('resize', () => {
			let { innerWidth, innerHeight } = window
			if (innerHeight < lastHeight - 100 || innerHeight > lastHeight + 100) {
				let hp = innerHeight < 455 ? 40 : 58
				this.fixMapContainerSize(hp)
				lastHeight = innerHeight
			}
			else if (innerWidth < lastWidth - 100 || innerWidth > lastWidth + 100) {
				let hp = innerWidth < 360 ? 40 : innerWidth < 440 ? 50 : 58
				if (innerWidth < 845) { hp -= 8 }
				this.fixMapContainerSize(hp)
				lastWidth = innerWidth
			}
		})

		bus.$on('print-map',this.printMap)
	},
	mounted() { this.measureAndRender() },
	watch: {
		posterSize() { this.measureAndRender() },
		mapColor(v){
			if(v == 'pencil') this.selectedStyle = this.styles.Pencil
			else if(v == 'blue') this.selectedStyle = this.styles.Blue
			else if(v == 'roy') this.selectedStyle = this.styles.RoyLichtenstein
			this.map.setStyle(this.selectedStyle)
		}
	},
	computed:{
		...mapGetters('map',['mapColor']),
	},
	methods: {
		measureAndRender() {
			// Inner width of current window
			let { innerWidth } = window

			// Calculating height percentage
			let hp = innerWidth < 360 ? 40 : innerWidth < 440 ? 50 : 58
			if (innerWidth < 845) { hp -= 8 }
			if (this.posterSize === '50-70') { hp += 1 }
			else if (this.posterSize === '70-100') { hp += 2 }

			// fixing map size
			this.fixMapContainerSize(hp);
		},
		fixMapContainerSize(hp) {
			// Targeting map container
			let mapCon = document.querySelector("#mapboxgl-container")

			// Calculating height and ratio
			let height = (window.innerHeight / 100) * hp
			let ratio = eval(this.posterSize.split("-").join("/"))

			// Setting height and width
			mapCon.style.cssText = `
            height:${height}px;
            width:${height * ratio}px
         `
			// Rendering map
			this.renderMap()
		},
		renderMap() {
			this.selectedStyle = this.styles.light
			mapboxgl.accessToken = this.accessToken
			let options = {
				container: 'mapboxgl-container',
				style: this.selectedStyle,
				zoom: 10,
				center: [13.4050, 52.5200],
				// center: [10.4515,51.1657]
			}
			this.map = new mapboxgl.Map(options);
		},
		printMap(){
			var width = 70
			var height = 100
			var dpi = 300
			var format = 'pdf'
			var unit = 'cm'
			var style = this.map.getStyle()

			var zoom = this.map.getZoom();
			var center = this.map.getCenter();
			var bearing = this.map.getBearing();
			var pitch = this.map.getPitch();
console.log(this.map);
			this.createPrintMap(width, height, dpi, format, unit, zoom, center, bearing, style, pitch);
		},
		createPrintMap(width, height, dpi, format, unit, zoom, center, bearing, style, pitch) {
			var actualPixelRatio = window.devicePixelRatio;
			Object.defineProperty(window, 'devicePixelRatio', {
					get: function() {return dpi / 96}
			});

			// Create map container
			var hidden = document.createElement('div');
			hidden.className = 'hidden-map';
			document.body.appendChild(hidden);
			var container = document.createElement('div');
			let can = document.querySelector('.mapboxgl-canvas')
			container.style.width = can.width + 'px';
			container.style.height = can.height + 'px';
			hidden.appendChild(container);

			// Render map
			mapboxgl.accessToken = this.accessToken
			var renderMap = new mapboxgl.Map({
				container: container,
				center: center,
				zoom: zoom,
				style: style,
				bearing: bearing,
				pitch: pitch,
				interactive: false,
				preserveDrawingBuffer: true,
				fadeDuration: 0,
				attributionControl: false
			});
			console.log(renderMap);
			let _this = this
			renderMap.once('idle', function() {
				if (format == 'png') {
					renderMap.getCanvas().toBlob(function(blob) {
						saveAs(blob, 'map.png');
					});
				} else {
					var pdf = new jsPDF({
						orientation: width > height ? 'l' : 'p',
						unit: 'px',
						format: [_this.toPixels(width), _this.toPixels(height)],
						compress: true
					});
					// let xOffset = (center.lng * _this.toPixels(width)) / 360
					// let yOffset = (center.lat * _this.toPixels(height)) / 180
					console.log(renderMap.getCanvas().toDataURL('image/png'));
					pdf.addImage(renderMap.getCanvas().toDataURL('image/png'), 'png', 0, 0, _this.toPixels(width), _this.toPixels(height), null, 'FAST');

					var title = 'MAP'
					let subject = ''
					let attribution = ''
					// map.getStyle().name,
					// 		subject = "center: [" + form.lonInput.value  + ", " + form.latInput.value + ", " + form.zoomInput.value + "]",
					// 		attribution = '(c) ' +
					// 				(form.styleSelect.value.indexOf('mapbox') >= 0 ? 'Mapbox' : 'OpenMapTiles') +
					// 				', (c) OpenStreetMap';

					// pdf.setProperties({
					// 	title: title,
					// 	subject: subject,
					// 	creator: 'Print Maps',
					// 	author: attribution
					// })

					pdf.save('map.pdf');
				}

				renderMap.remove();
				hidden.parentNode.removeChild(hidden);
				Object.defineProperty(window, 'devicePixelRatio', {
					get: function() {return actualPixelRatio}
				});
			});
		},
		toPixels(length) {
			var unit = 'cm'
			var conversionFactor = 37.7952755906;

			return conversionFactor * length;
		},
	}
}
</script>
<style lang="scss" scoped>
	.map-view {
		padding-bottom: 4rem;
		.map-container {
			height: max-content;
			width: max-content;
			&.cm30-40 {
				.texts {
					.mv-title {
						font-size: 1.6em;
					}
					.mv-subtitle {
						font-size: 1em;
					}
				}
			}
			&.cm50-70 {
				.texts {
					padding: 0.5rem 1rem;
					.mv-title {
						font-size: 1.4em;
					}
					.mv-subtitle {
						font-size: 0.9em;
					}
				}
			}
			&.cm70-100 {
				.texts {
					padding: 0.8rem 1.6rem;
					.mv-title {
						font-size: 1.2em;
					}
					.mv-subtitle {
						font-size: 0.8em;
					}
				}
			}
			.zoom-in-out {
				bottom: 1.5rem;
				right: 0.2rem;
				transform: scale(0.8);
				z-index: 10;
			}

			.poster-sizes {
				position: absolute;
				bottom: -3rem;
				left: 50%;
				transform: translate(-50%, -50%);
				select {
					font-size: 0.9em;
				}
			}
		}
	}
</style>