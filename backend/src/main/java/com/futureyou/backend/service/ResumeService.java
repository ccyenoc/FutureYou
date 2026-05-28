package com.futureyou.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;


@Service

public class ResumeService{

    public String extractText(MultipartFile file){
        String fileType = file.getContentType();

        try {
            if("application/pdf".equals(fileType)){
                return extractPdf(file);
            }
            else if("application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(fileType)){
                return extractDocx(file);
            }
            else if (fileType.startsWith("image/")) {
                return extractImage(file);
            }

            return "Unsupported File Type";
            
        } catch (Exception e) {
            e.printStackTrace();

            return "Failed to extract Resume";
        }

    }

    private String extractPdf(MultipartFile file){

        try{

            PDDocument document = PDDocument.load(file.getInputStream());

            PDFTextStripper stripper = new PDFTextStripper();

            String text = stripper.getText(document);

            document.close();

            return text;
        }
        catch(Exception e){
            e.printStackTrace();

            return "Failed to extract PDF" ;
        }

    }

    private String extractDocx(MultipartFile file){

        try{
        XWPFDocument document = new XWPFDocument(file.getInputStream());

        XWPFWordExtractor extractor = new XWPFWordExtractor(document);

        String text = extractor.getText();

        extractor.close();
        document.close();

        return text;
        }
        catch(Exception e){
            e.printStackTrace();

            return "Failed to extract Document";
        }
    }

    private String extractImage(MultipartFile file){
        try {
            ByteString imgBytes = ByteString.readFrom(file.getInputStream());

            Image image = Image.newBuilder().setContent(imgBytes).build();

            Feature feature = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();

            AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(image).build();

            try (ImageAnnotatorClient vision = ImageAnnotatorClient.create()) {

                BatchAnnotateImagesResponse response = vision.batchAnnotateImages(java.util.List.of(request));

                TextAnnotation annotation = response.getResponses(0).getFullTextAnnotation();

                return annotation.getText();
            } catch (Exception e) {
                e.printStackTrace();

                return "Failed to extract Image text";
            }
        } 
        catch (Exception e) {
            e.printStackTrace();
            return "Failed to extract Image text";
        }
    }

    
}