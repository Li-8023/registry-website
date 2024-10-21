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

interface OldCardItemProps {
  item: {
    package: string;
    download?: number;
    version: {
      created_at: string;
    };
    description?: string;
    zipball_url?: string;
  };
}

export default function OldCardItem({ item }: OldCardItemProps) {
  const splitMaxLength = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  const downloadPlugin = (name: string) => {
    console.log(`Downloading plugin: ${name}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
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
                window.open(item.zipball_url || "", "_blank");
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
