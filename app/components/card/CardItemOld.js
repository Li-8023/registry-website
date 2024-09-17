import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faFire,
  faBook,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

export default function OldCardItem({ item }) {
  const splitMaxLength = (str, length) => {
    if (typeof str !== "string") {
      return "";
    }
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  const downloadPlugin = (name) => {
    console.log(`Downloading plugin: ${name}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("zh-CN", options);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        borderRadius: "15px",
      }}
    >
      {/* Ribbon */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "-20px",
          backgroundColor: "#6676fa",
          color: "white",
          width: "90px",
          height: "25px",
          transform: "rotate(45deg)",
          textAlign: "center",
          lineHeight: "25px",
          fontSize: "0.8rem",
        }}
      >
        仅维护
      </div>

      <CardHeader
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Link for item.package */}
            <Link href={`/oldDetails/${item.package}`} passHref>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1.0rem",
                  color: "#4a6ff7",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#3a56d3",
                  },
                }}
              >
                {splitMaxLength(item.package, 23)}
              </Typography>
            </Link>

            {/* Fire icon and download number */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "30px",
              }}
            >
              <FontAwesomeIcon
                icon={faFire}
                style={{
                  marginRight: "5px",
                  fontSize: "0.9rem",
                  color: "orange",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "orange", fontSize: "0.9rem" }}
              >
                {item.download}
              </Typography>
            </div>
          </div>
        }
        subheader={
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "8px" }}
          >
            {" "}
            {/* Added marginTop to create a gap */}
            <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "5px" }} />
            <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
              {formatDate(item.version.created_at)}
            </Typography>
          </div>
        }
      />
      <CardContent
        sx={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "100px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description &&
            (() => {
              try {
                const parsedDescription = JSON.parse(
                  item.description.replace(/'/g, '"')
                );
                return parsedDescription.zh;
              } catch (error) {
                console.error("Failed to parse description:", error);
                return item.description;
              }
            })()}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <center style={{ width: "100%" }}>
          <div className="button flex space-x-4">
            <button
              className="preButton btn btn-outline-primary"
              style={{
                backgroundColor: "#6676fa",
                color: "white",
                fontSize: "0.8rem",
                padding: "5px 10px",
                marginRight: "10px",
              }}
              onClick={() =>
                window.open(`/oldDetails/${item.package}`, "_blank")
              }
            >
              <FontAwesomeIcon icon={faBook} /> 查看详情
            </button>

            <button
              onClick={() => {
                console.log(item.zipball_url);
                window.open(item.zipball_url, "_blank");
              }}
              className="download btn btn-outline-secondary"
              style={{
                fontSize: "0.8rem",
                padding: "5px 10px",
              }}
            >
              <FontAwesomeIcon icon={faDownload} /> 下载组件
            </button>
          </div>
        </center>
      </CardActions>
    </Card>
  );
}

// import React from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBook,
//   faDownload,
//   faFire,
//   faCalendar,
//   faDesktop,
// } from "@fortawesome/free-solid-svg-icons";

// const OldCardItem = ({ item }) => {
//   const splitMaxLength = (str, length) => {
//     if (typeof str !== "string") {
//       return "";
//     }
//     return str.length > length ? str.substring(0, length) + "..." : str;
//   };

//   const downloadPlugin = (name) => {
//     console.log(`Downloading plugin: ${name}`);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "2-digit", day: "2-digit" };
//     return new Date(dateString).toLocaleDateString("zh-CN", options);
//   };

//   return (
//     <div
//       className="wow fadeInUp mb-4"
//       data-wow-delay={`${item.delayTime}s`}
//       style={{
//         visibility: "visible",
//         animationDelay: "0.2s",
//         animationName: "fadeInUp",
//       }}
//     >
//       <div
//         className="themes-box shadow-lg rounded-xl overflow-hidden"
//         style={{
//           overflow: "hidden",
//           width: "100%",
//           maxWidth: "350px",
//           margin: "0 auto",
//           position: "relative", // Ensure relative positioning for the ribbon
//         }}
//       >
//         {/* Smaller Ribbon for "仅维护" */}
//         <div
//           className="ribbon"
//           style={{
//             position: "absolute",
//             top: "10px",
//             right: "-15px",
//             width: "90px", // Smaller width
//             height: "25px", // Smaller height
//             backgroundColor: "#6676fa",
//             color: "white",
//             transform: "rotate(45deg)",
//             textAlign: "center",
//             lineHeight: "25px", // Match height
//             fontSize: "0.7rem", // Slightly smaller font size
//           }}
//         >
//           仅维护
//         </div>

//         <div className="main-content p-3">
//           <h5 className="flex items-center text-sm">
//             <Link href={`/details/${item.package}`}>
//               {splitMaxLength(item.package, 20)}
//             </Link>
//             <span
//               className="flex items-center text-orange-500 text-sm"
//               style={{ marginLeft: "30px" }}
//             >
//               <FontAwesomeIcon
//                 icon={faFire}
//                 className="mr-1"
//                 style={{ marginRight: "5px" }}
//               />
//               <span>{item.download}</span>
//             </span>
//           </h5>
//           <div className="last-part mt-2">
//             <div className="right" style={{ width: "100%" }}>
//               <p className="text text-sm" style={{ width: "100%" }}>
//                 {item.version.created_at && (
//                   <>
//                     <FontAwesomeIcon icon={faCalendar} />{" "}
//                     {formatDate(item.version.created_at)}
//                   </>
//                 )}
//                 {item.version.created_at && <>&nbsp;&nbsp;&nbsp;</>}
//               </p>
//               <p
//                 className="text-flow-ellipsis-multiple mt-2 text-xs"
//                 style={{ height: "50px", color: "darkgray" }}
//               >
//                 {item.description &&
//                   (() => {
//                     try {
//                       const parsedDescription = JSON.parse(
//                         item.description.replace(/'/g, '"')
//                       );
//                       return parsedDescription.zh;
//                     } catch (error) {
//                       console.error("Failed to parse description:", error);
//                       return item.description;
//                     }
//                   })()}
//               </p>
//             </div>
//           </div>
//           <div className="past-part mt-2">
//             <center>
//               <div className="button flex space-x-4">
//                 <button
//                   className="preButton btn btn-outline-primary"
//                   style={{
//                     backgroundColor: "#6676fa",
//                     color: "white",
//                     fontSize: "0.8rem",
//                     padding: "5px 10px",
//                   }}
//                   onClick={() =>
//                     window.open(`/oldDetails/${item.package}`, "_blank")
//                   }
//                 >
//                   <FontAwesomeIcon icon={faBook} /> 查看详情
//                 </button>

//                 {item.zipball_url ? (
//                   <a
//                     href={item.zipball_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="download btn btn-outline-secondary"
//                     style={{
//                       fontSize: "0.8rem",
//                       padding: "5px 10px",
//                     }}
//                   >
//                     <FontAwesomeIcon icon={faDownload} /> 下载组件
//                   </a>
//                 ) : (
//                   <button
//                     onClick={() => downloadPlugin(item.package)}
//                     className="download btn btn-outline-secondary"
//                     style={{
//                       fontSize: "0.8rem",
//                       padding: "5px 10px",
//                     }}
//                   >
//                     <FontAwesomeIcon icon={faDownload} /> 下载组件
//                   </button>
//                 )}
//               </div>
//             </center>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OldCardItem;
