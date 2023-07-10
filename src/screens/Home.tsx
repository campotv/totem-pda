import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useEffect, useState } from "react";
import { useToast } from "native-base";
import { useConfig } from "@hooks/useConfig";
import WebView from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Network from "expo-network";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Print from "expo-print";
import { printToFileAsync } from "expo-print";

export function Home(this: any) {
  const route = useRoute();
  const navigation = useNavigation();
  const { config } = useConfig();
  const [url, setUrl] = useState("");
  const [mac, setMac] = useState("");
  const toast = useToast();

  const routeParams: any = route.params;

  function replaceImageSrcById(htmlString: string, id: any, newSrc: any) {
    const divRegex = new RegExp(`<div\\s+id="${id}"[^>]*>(.*?)<\\/div>`, "g");
    const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/g;

    const modifiedHtml = htmlString.replace(divRegex, (divTag: string) => {
      const modifiedDivTag = divTag.replace(
        imgRegex,
        (imgTag: string, srcAttr: any) => {
          const newImgTag = imgTag.replace(srcAttr, newSrc);
          return newImgTag;
        }
      );

      return modifiedDivTag;
    });

    return modifiedHtml;
  }

  function replaceScriptSrcQRCODE(htmlString: string, newSrc: any) {
    const scriptRegex = /<script[^>]*src="([^"]*)"[^>]*><\/script>/g;

    const modifiedHtml = htmlString.replace(
      scriptRegex,
      (scriptTag: string, srcAttr: any) => {
        if (srcAttr.includes("qrcode.js")) {
          const newScriptTag = scriptTag.replace(srcAttr, newSrc);
          return newScriptTag;
        }
        return scriptTag;
      }
    );

    return modifiedHtml;
  }

  function replaceLinkHref(htmlString: string, newHref: any) {
    const linkRegex = /<link[^>]*href="([^"]*)"[^>]*\/?>/g;

    const modifiedHtml = htmlString.replace(
      linkRegex,
      (linkTag: string, hrefAttr: any) => {
        if (hrefAttr.includes("impressao.css")) {
          const newLinkTag = linkTag.replace(hrefAttr, newHref);
          return newLinkTag;
        }
        return linkTag;
      }
    );

    return modifiedHtml;
  }

  async function download2() {
    const fileUrl = "http://192.168.100.25:8080/sga/pdf";
    const fileName = `${Date.now()}.pdf`;

    // const { uri: htmlUri } = await FileSystem.downloadAsync(
    //   fileUrl,
    //   FileSystem.documentDirectory + "temp.html"
    // );
    // const htmlContent = await FileSystem.readAsStringAsync(htmlUri);

    // const modifiedHtmlcss = await replaceLinkHref(
    //   htmlContent,
    //   `${config.ip_totem}/sga/totem/../layout/totem/impressao.css`
    // );

    // const modifiedHtmlQRCODE = await replaceScriptSrcQRCODE(
    //   modifiedHtmlcss,
    //   `${config.ip_totem}/sga/data/scripts/qrcode/qrcode.js`
    // );
    // const finalHTML = await replaceImageSrcById(
    //   modifiedHtmlQRCODE,
    //   "header",
    //   `${config.ip_totem}/../../CONFIGURACOES/logo/cli/bw.png`
    // );

    // const file = await printToFileAsync({
    //   html: finalHTML,
    //   base64: false,
    // });

    // saveFile(file.uri);

    FileSystem.downloadAsync(fileUrl, FileSystem.documentDirectory + fileName)
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
        saveFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function saveFile(filePath: string) {
    const albumName = "auto print";
    const permission = await MediaLibrary.requestPermissionsAsync();

    let asset = null;
    if (permission.granted) {
      try {
        asset = await MediaLibrary.createAssetAsync(filePath);
      } catch (e) {
        console.error("MediaLibrary.createAssetAsync failed", e);
      }

      if (asset) {
        try {
          let album = await MediaLibrary.getAlbumAsync(albumName);
          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          } else {
            album = await MediaLibrary.createAlbumAsync(
              albumName,
              asset,
              false
            );
          }
          const assetResult = await MediaLibrary.getAssetsAsync({
            first: 1,
            album,
            sortBy: MediaLibrary.SortBy.creationTime,
          });
          asset = await assetResult.assets[0];
        } catch (e) {
          console.error(" failed", e);
        }
      } else {
        console.error("unable to use MediaLibrary, can not create assets");
      }
    }
  }

  const handleMessage = async (event: { nativeEvent: { data: any } }) => {
    const texto = event.nativeEvent.data;
    // download2()
    try {
      const message = JSON.parse(texto);
      if (message.action === "longPress") {
        navigation.navigate("config");
        console.log("long");
      }

      if (message.action === "impressao") {
        //     const finalHTML = `<!DOCTYPE html>
        //     <html lang="en">
        //       <head>
        //         <link
        //           rel="stylesheet"
        //           type="text/css"
        //           href="http://192.168.100.25:8080/sga/totem/../layout/totem/impressao.css"
        //         />
        //       </head>
        //       <body>
        //        ${replaceImageSrcById(
        //         message.data,
        //         "header",
        //         `${config.ip_totem}/../../CONFIGURACOES/logo/cli/bw.png`
        //       )}
        //         <script
        //           type="text/javascript"
        //           src="http://192.168.100.25:8080/sga/data/scripts/qrcode/qrcode.js"
        //         ></script>
        //         <script>
        //           document.getElementById("div_qrcode").style.display = "none";
        //           QRCode.toCanvas(
        //             document.getElementById("canvas"),
        //             "https://filaonline.cwbox.net.br/filaonline_luis?senha=N20",
        //             function (error) {
        //               if (error) {
        //                 console.log(error);
        //               } else {
        //                 document.getElementById("div_qrcode").style.display = "";
        //                 console.log("success!");
        //               }
        //             }
        //           );
        //         </script>
        //       </body>
        //     </html>`;

        const finalHTML2 = `<!DOCTYPE html>
        <html>
          <head>
          </head>
          <body>
          <img alt="" src=${message.data.trim()}>     
          </body>
        </html>`;
        const file = await printToFileAsync({
          html: finalHTML2,
          base64: true,
        });

        saveFile(file.uri);
      }
    } catch (error) {}
  };

  async function getMacAddress() {
    const macAddress = await Network.getMacAddressAsync();
    setMac(macAddress);
  }

  useEffect(() => {
    // getMacAddress()
    if(!config?.ip_totem){
      navigation.navigate("config");
    }
  }, []);

  const INJECTED_JAVASCRIPT = `(function() {    
    window.ReactNativeWebView.postMessage(document.querySelector("body").innerHTML);
    document.addEventListener('contextmenu', function(event) {
      event.preventDefault();
      window.ReactNativeWebView.postMessage(JSON.stringify({
        action: 'longPress',
        targetId: event.target.dataset.webviewId
      }));
    });
  })();`;

  function handleWebViewEvent(event: { nativeEvent: { data: any; url: any } }) {
    const { data, url } = event.nativeEvent;
    // Faça o processamento necessário com as informações da página
    // console.log('Dados:', data);
    console.log("URL:", url);
  }
  return (
    <View className="flex-1">
      <StatusBar hidden={true} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
        behavior="padding"
      >
        <WebView
          source={{ uri: config.ip_totem + "/sga/totem" }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          onMessage={handleMessage}
          injectedJavaScript={INJECTED_JAVASCRIPT}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
