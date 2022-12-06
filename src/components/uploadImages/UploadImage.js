import React from 'react';
import ImageUploading from 'react-images-uploading';

const UploadImage = ({isMulti, images, setImages}) => {

    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
      <div>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div
              className="upload__image-wrapper"
              style={{ marginLeft: "45px" }}
            >
              {!isMulti && (
                <div
                  style={{
                    width: "200px",
                    height: "150px",
                    background: "#999",
                    cursor: "pointer",
                  }}
                  onClick={
                    imageList.length > 0
                      ? () => onImageUpdate(0)
                      : onImageUpload
                  }
                  {...dragProps}
                >
                  {imageList.length > 0 ? (
                    <img src={images[0]["data_url"]} alt="" width="100" />
                  ) : (
                    "Upload image"
                  )}
                </div>
              )}
              {isMulti && (
                <div>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      background: "#999",
                      cursor: "pointer",
                    }}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Upload image
                  </div>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div>
    );
};

export default UploadImage;